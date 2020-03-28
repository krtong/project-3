const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const keys = require('./keys');
const User = require('../models/user')

passport.serializeUser((user, done) => {
  console.log('user.id HERE: ', user.id)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // check if user already exists in db
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser) {
        // already have the user
        console.log('user is: ', currentUser)
        done(null, currentUser)
      } else {
        // if not, create new user in db
        console.log('profile', profile)
        console.log('profile._json.picture', profile._json.picture)
        new User({
          username: profile.displayName,
          googleId: profile.id,
          thumbnail: profile._json.picture
        }).save().then((newUser) => {
          console.log(`new user created: ${newUser}`)
          done(null, newUser)
        })
      }
    })
  })
)

passport.use(
  new FacebookStrategy({
    callbackURL: '/auth/facebook/redirect',
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({facebookId: profile.id}).then((currentUser) => {
      if(currentUser) {
        // already have the user
        console.log('user is: ', currentUser)
        done(null, currentUser)
      } else {
        // if not, create new user in db
        console.log('profile', profile)
        // console.log('profile._json.picture', profile._json.picture)
        new User({
          username: profile.displayName,
          facebookId: profile.id,
          // email: profile.emails[0].value
        }).save().then((newUser) => {
          console.log(`new user created: ${newUser}`)
          done(null, newUser)
        })
      }
    })
  })
)

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));