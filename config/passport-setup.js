const flash = require("connect-flash");
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const keys = require('./keys') || require('./environmentalVars');
const User = require('../models/user')

passport.serializeUser((user, done) => {
  console.log('serialize user here: ', user.id)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log("deserialize user here: ", id)
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    callbackURL: '/api/auth/google/redirect',
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
    callbackURL: '/api/auth/facebook/redirect',
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

// //From the passport documentation
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      console.log('req.body.email', req.body.email);
      console.log('username', username);
      console.log('password', password);

      // CASE 1:
        // The User exists, they enter correct password
      // CASE 2:
        // The User exists, they enter INcorrect password
      // CASE 3:
        // The User does not exist, create new user

      
      //IF THERE IS ALREADY THIS USER
      User.findOne({ username: username }).then((currentUser) => {
        // const bcryptCompare;
        console.log("=======================")
        console.log("Begin user flow here:")
        //If the user already exists in our DB...
        if (currentUser){
          console.log("**User already exists")
          
          //Check to see if password is correct...
          var bcryptCompare;
          bcrypt.compare(password, currentUser.password).then(function(result) {
            // console.log("Just before bcrypt assigns...");
            bcryptCompare = result;
            // console.log("bcryptCompare: ", bcryptCompare);
            if (bcryptCompare) {
              console.log("**Password was correct")
              done(null, currentUser)
            } else {
              console.log("**Password was incorrect")
              return done(null, false, {message: 'Incorrect password.'});
            }
          });
        } else if (!req.body.email) {
          console.log("**Was login, and User didn't exst")
          return done(null, false, {message: 'User does not exist.'});
        } else {
          // If we do not find this user in DB, create new user  
          // if not, create new user in db
          console.log("**This is a new user")
          const newUser = new User({
            username: username,
            password: password,
            email: req.body.email
          });

          console.log("arrived before bcrypt");
          console.log(newUser)

          bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save User
              newUser.save()
                .then(user => {
                  done(null, user)
                })
                .catch(err => console.log(err));
            }))
          

        }
      })
    }
  )
)

