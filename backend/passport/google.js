const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;  //oauth20 
const bcrypt = require("bcrypt");
const User = require("../models/user");



module.exports = () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            "http://diarycalendar.herokuapp.com/api/user/google/callback",
          // scope: [
          //   "profile",
          //   "https://www.googleapis.com/auth/calendar.events",
          //   "https://www.googleapis.com/auth/calendar.readonly",
          // ],
          proxy: true,
          // accessType: "offline",
          // prompt: "consent",
        },
        async function (accessToken, refreshToken, profile, done) {
          let resultOne = await User.findOne({ userId: profile.id });
          if (resultOne) {
            await User.updateOne(
              { userId: profile.id },
              {
                accessToken: accessToken,
              }
            );
          } else {
            resultOne = await new User({
              userId: profile.id,
              username: profile.displayName,
              provider: "google",
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          }
          await resultOne.save();
          let ii = await User.findOne({ userId: profile.id });
          done(null, resultOne);

          // User.findOne({ userId: profile.id }).then((user) => {
          //   console.log("name : " + profile.displayName);
          //   if (user) {

          //   } else {
          //     new User({
          //       userId: profile.id,
          //       userName: profile.displayName,
          //       provider: "google",
          //       accessToken: accessToken,
          //       refreshToken: refreshToken,
          //     })
          //       .save()
          //       .then((newUser) => {
          //         console.log("new user created : " + newUser);
          //       });
          //   }
          //   done(null, user);
          //});

          //refresh Token이 저장이 안됐는데도 이제 된다?
        }
      )
    );
}