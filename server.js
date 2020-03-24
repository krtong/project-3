const express = require("express");

const mongoose = require("mongoose");
// const routes = require("./routes");
// const app = express();

// ********************************************************
// START Cody additions
const authRoutes = require('./routes/auth-routes')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const router = require("express").Router();

const app = express();

// cookieSession config
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  keys: ['randomstringhere']
}));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

app.use('/auth', authRoutes);

// // Strategy config
// passport.use(new GoogleStrategy({
//     clientID: 'SEE SLACK',
//     clientSecret: 'SEE SLACK',
//     callbackURL: 'http://localhost:3000/auth/google/callback'
//   },
//   (accessToken, refreshToken, profile, done) => {
//     done(null, profile); // passes the profile data to serializeUser
//   }
// ));

// // Used to stuff a piece of information into a cookie
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Used to decode the received cookie and persist session
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// // Middleware to check if the user is authenticated
// function isUserAuthenticated(req, res, next) {
//   if (req.user) {
//       next();
//   } else {
//       res.send('You must login!');
//   }
// }

// Routes
// app.get('/', (req, res) => {
//   res.render('index.ejs');
// });

// passport.authenticate middleware is used here to authenticate the request
// router.get('/auth/google', passport.authenticate('google', {
//   scope: ['profile'] // Used to specify the required data
// }));

// Logout route
// app.get('/auth/google', (req, res) => {
//   res.send('HELLO THERE CODY');
// });

// // The middleware receives the data from Google and runs the function on Strategy config
// app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
//   res.redirect('/secret');
// });

// // Secret route
// app.get('/secret', isUserAuthenticated, (req, res) => {
//   res.send('You have reached the secret route');
// });

// // Logout route
// app.get('/logout', (req, res) => {
//   req.logout(); 
//   res.redirect('/');
// });

// END Cody additions
// ********************************************************


const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cookingdb");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
