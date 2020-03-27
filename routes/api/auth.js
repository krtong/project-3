const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect("/");
});

//Google oAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user)
  res.redirect("http://localhost:3000/search");
});

//Facebook oAuth
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
  })
);

// callback route for google to redirect to
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook"),
  (req, res) => {
    // res.send(req.user)
    res.redirect("http://localhost:3000/search");
  }
);

module.exports = router;

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
