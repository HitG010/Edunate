const express = require('express');
// const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../Models/user');
const Institution = require('../Models/user');
const passport = require('../passportConfig');
const router = express.Router();

// Login for Students & Almuni
router.post('/login/user', (req, res, next) => {
  passport.authenticate('user-local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'User login successful', user });
    });
  })(req, res, next);
});

// Login for Alumni
// router.post('/login/alumni', (req, res, next) => {
//   passport.authenticate('alumni-local', (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(400).json({ message: info.message });

//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       return res.json({ message: 'Alumni login successful', user });
//     });
//   })(req, res, next);
// });

// Login for Institutions
router.post('/login/institution', (req, res, next) => {
  passport.authenticate('institution-local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message });

    console.log(req.logIn.toString());
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Institution login successful', user });
    });
  })(req, res, next);
});


module.exports = router;
