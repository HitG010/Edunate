const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require('bcrypt');
const User = require('./Models/user');
const Institution = require('./Models/institute');

// Common logic for user verification
async function verifyUser(email, password, Model, done) {
  try {
    const user = await Model.findOne({ email });
    if (!user) return done(null, false, { message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

// Student Strategy
passport.use(
  'user-local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => verifyUser(email, password, User, done)
  )
);

// Alumni Strategy
// passport.use(
//   'alumni-local',
//   new LocalStrategy(
//     { usernameField: 'email', passwordField: 'password' },
//     (email, password, done) => verifyUser(email, password, Alumni, done)
//   )
// );

// Institution Strategy
passport.use(
  'institution-local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    (email, password, done) => verifyUser(email, password, Institution, done)
  )
);

// Serialize User
passport.serializeUser((user, done) => {
  console.log('Serialized User: ', user);
  done(null, { id: user.id, role: user.role });
});

// Deserialize User
passport.deserializeUser(async (obj, done) => {
  try {
    let user;
    if (obj.role === 'Student') user = await User.findById(obj.id);
    else if (obj.role === 'Alumni') user = await User.findById(obj.id);
    else if (obj.role === 'Institution') user = await Institution.findById(obj.id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serialized User: ", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserialized User: ", id);
  try {
    User.findById(id).then((user) => done(null, user));
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
