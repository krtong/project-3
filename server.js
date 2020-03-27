const express = require("express");

const mongoose = require("mongoose");
const app = express();

const routes = require("./routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const GoogleStrategy = require("passport-google-oauth20");
const cookieSession = require("cookie-session");

const router = require("express").Router();

// cookieSession config
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ["randomstringhere"]
  })
);

app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Define middleware here
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());tes);
app.use(routes)
