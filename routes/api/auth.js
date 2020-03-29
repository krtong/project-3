
const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");


// Local auth *************************************
// auth login

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log("SUCCESS HERE, above redirect")
    // Cannot redirect from the server with axios, has to be on client
    res.redirect(`${process.env.REACT_APP_API_CLIENT_URL}/`);
  });



// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  // req.logout();
  // res.redirect("/");

  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });

});



// Google oAuth *************************************
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



//Facebook oAuth *************************************
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  })
);

// callback route for facebook to redirect to
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


// **********************************************************
// GARBAGE BELOW - can likely delete later




// const router = require("express").Router();
// const passport = require("passport");

// // auth login
// router.get("/login", (req, res) => {
//   res.render("login", { user: req.user });
// });

// // auth logout
// router.get("/logout", (req, res) => {
//   // handle with passport
//   req.logout();
//   res.redirect("/");
// });

// //Google oAuth
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile"]
//   })
// );

// // callback route for google to redirect to
// router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
//   // res.send(req.user)
//   res.redirect("http://localhost:3000/search");
// });

// //Facebook oAuth
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", {
//     scope: ["public_profile", "email"]
//   })
// );

// // callback route for google to redirect to
// router.get(
//   "/facebook/redirect",
//   passport.authenticate("facebook"),
//   (req, res) => {
//     // res.send(req.user)
//     res.redirect("http://localhost:3000/search");
//   }
// );

// module.exports = router;

/* const router = require('express').Router();
const passport = require('passport');
// const authController = require("../../controllers/authController")

// auth login
// router
//     .route("/login")
//     .get('/login', (req, res) => {
//     res.render('login', { user: req.user });
// });

// auth logout
// router.get('/logout', (req, res) => {
//     // handle with passport
//     req.logout();
//     res.redirect('/')
// });



router.post('/register', (req, res) => {
  // console.log('user signup!', req);
  console.log('req.body', req.body);
  // console.log("REQ", req)
  // console.log("RES", res)
  // const { name, email, password } = req.body
  // console.log(name, email, password);
})



//Google oAuth
  router.get('/google', passport.authenticate('google', {
    scope: ['profile']
  }));

  // callback route for google to redirect to
  router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user)
    res.redirect('http://localhost:3000/search');
  })

//Facebook oAuth
  router.get('/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));

  // callback route for google to redirect to
  router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.send(req.user)
    res.redirect('http://localhost:3000/search');
  })


module.exports = router; */
