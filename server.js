const express = require("express");

const mongoose = require("mongoose");
const app = express();

// const authRoutes = require('./routes/auth-routes') HERE!
const routes = require("./routes");

const passport = require('passport');
const passportSetup = require('./config/passport-setup')
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const router = require("express").Router();

const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// cookieSession config
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  keys: ['randomstringhere']
}));

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// app.use('/auth', authRoutes); //HERE!
app.use(routes);


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cookingdb");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});