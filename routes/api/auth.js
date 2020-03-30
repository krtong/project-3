
const router = require("express").Router();
const flash = require("connect-flash");
router.use(flash());
const passport = require("passport");
const axios = require("axios");


// ===================================
// Local auth ========================
// ===================================

router.get('/login', function(req, res) {
  console.log("are we here?")
  console.log(req.flash('error'));
  res.json(req.flash())
  res.send();
});

// router.post('/login', 
//   passport.authenticate('local', { 
//     failureRedirect: '/',
//     failureFlash: true  
//   }),
//   function(req, res) {
//     console.log("SUCCESS HERE, above redirect")
//   //   // Cannot redirect from the server with axios, has to be on client
//     return res.redirect('/');
//   }
// );

// WORK BELOW:
//     I was trying to get it to route the user
//     to /login if failed, couldn't get it to work
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("Do we make it back to auth routes callback?")
    console.log("user in auth routes callback: ", user);
    console.log("req.session.userid", req.session.userid);

    console.log('INFO: ', info)
    
    if (err) { 
      console.log("err")
      return next(err); 
    } else if (!user) {
      console.log("no user")
      var redir = { redirect: "/login" }
      return res.json(redir);
    } else {
      req.logIn(user, function(err) {
        console.log("Made it to logIn")
        if (err) { return next(err); }
        var redir = { redirect: "/" }
        return res.json(redir);
      });
    }

    // // console.log(res);

    // console.log("just above redirectTo")
    // // return res.redirect(redirectTo);
    // // console.log("RES HERE: ", res)
    // console.log(res.data)
    // return res
    // console.log("Does it go below redirect in auth routes")
  })(req, res, next);
});


// auth logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect(`${process.env.REACT_APP_API_CLIENT_URL}/login`);
});


// ===================================
// Google oAuth ======================
// ===================================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route for google to redirect to
// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {  
  // res.send(req.user)
  res.redirect(`${process.env.REACT_APP_API_CLIENT_URL}/`);
});


// ===================================
//Facebook oAuth =====================
// ===================================
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  })
);

// Callback route for facebook to redirect to
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    console.log("do we arrive to facebook redirect?")
    // res.send(req.user)
    res.redirect(`${process.env.REACT_APP_API_CLIENT_URL}/`);
  }
);

module.exports = router;
