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
          callbackURL: process.env.absoluteURI + "/api/user/google/callback",
          proxy: true,
        },
        async function (accessToken, refreshToken, profile, done) {
          let resultOne = await User.findOne({ userId: profile.id });
          if (resultOne) {
            //이미 존재하는 사용자면
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
          return done(null, ii);
        }
      )
    );
}