const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;  //oauth20 사용하면 internal error
const bcrypt = require("bcrypt");
const User = require("../models/user");



module.exports = () => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:4000/api/user/google/callback",
          scope: [
            "profile",
            "https://www.googleapis.com/auth/calendar.events",
            "https://www.googleapis.com/auth/calendar.readonly",
          ],
        },
        function (accessToken, refreshToken, profile, done) {
          console.log("refresh : " + refreshToken);
          console.log("profile : " + profile.id);
          // User.findOneAndUpdate(
          //     { userId: profile.id },
          //     { $set: {
          //         userId: profile.id,
          //         provider : 'google',
          //     } }
          // , function(err,user){
          //     console.log('err : '+err);
          //     console.log('user : '+user);
          //     return done(err,user);
          // });
          User.findOne({ userId: profile.id }).then((user) => {
            console.log("name : " + profile.displayName);
            if (user) {
              console.log("user is : " + user);
            } else {
              new User({
                userId: profile.id,
                userName: profile.displayName,
                provider: "google",
                accessToken: accessToken,
                refreshToken: refreshToken,
              })
                .save()
                .then((newUser) => {
                  console.log("new user created : " + newUser);
                });
            }
            done(null, user);
          });
        }
      )
    );
}