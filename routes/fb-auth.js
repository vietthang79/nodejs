// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// const express = require("express");
// const User = require("../model/user-model");
// const config = require('./routes/config');

// // const router = express.Router();

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_SECRET_KEY,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       const user = await User.findOne({
//         accountId: profile.id,
//         provider: "facebook",
//       });
//       if (!user) {
//         console.log("Adding new facebook user to DB..");
//         const user = new User({
//           accountId: profile.id,
//           name: profile.displayName,
//           provider: profile.provider,
//         });
//         await user.save();
//         // console.log(user);
//         return cb(null, profile);
//       } else {
//         console.log("Facebook User already exist in DB..");
//         // console.log(profile);
//         return cb(null, profile);
//       }
//     }
//   )
// );

// router.get("/", passport.authenticate("facebook", { scope: "email" }));

// router.get(
//   "/callback",
//   passport.authenticate("facebook", {
//     failureRedirect: "/auth/facebook/error",
//   }),
//   function (req, res) {
//     // Successful authentication, redirect to success screen.
//     res.redirect("/auth/facebook/success");
//   }
// );

// router.get("/success", async (req, res) => {
//   const userInfo = {
//     id: req.session.passport.user.id,
//     displayName: req.session.passport.user.displayName,
//     provider: req.session.passport.user.provider,
//   };
//   res.render("fb-github-success", { user: userInfo });
// });

// router.get("/error", (req, res) => res.send("Error logging in via Facebook.."));

// router.get("/signout", (req, res) => {
//   try {
//     req.session.destroy(function (err) {
//       console.log("session destroyed.");
//     });
//     res.render("auth");
//   } catch (err) {
//     res.status(400).send({ message: "Failed to sign out fb user" });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const passport = require("passport");

// module.exports = (function () {
//   router.get("/", function (req, res) {
//     res.render("index", { user: req.user });
//   });

//   router.get("/create/index", function (req, res) {
//     //Return to page login
//   });

//   router.get("/account", ensureAuthenticated, function (req, res) {
//     res.render("account", { user: req.user });
//   });

//   router.get(
//     "/auth/facebook",
//     passport.authenticate("facebook", { scope: "email" })
//   );

//   router.get(
//     "/auth/facebook/callback",
//     passport.authenticate("facebook", {
//       successRedirect: "/",
//       failureRedirect: "/dangnhap",
//     }),
//     function (req, res) {
//       res.redirect("/");
//     }
//   );

//   router.get("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/");
//   });

//   return router;
// })();

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }


const express = require('express');
const router = express.Router();
const passport = require('passport');

// Định nghĩa hàm middleware ensureAuthenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/LGwFB');
}

// Định nghĩa các tuyến đường
router.get('/', function(req, res) {
  res.render('LGwFB', { user: req.user });
});

router.get('/login', function(req, res) {
  // render page login html
});

router.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', { user: req.user });
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) {
      // Xử lý lỗi khi đăng xuất
      console.log(err);
      return res.redirect('/'); // Hoặc thực hiện một hành động khác tùy theo yêu cầu của bạn
    }
    res.redirect('/');
  });
});


module.exports = router;
