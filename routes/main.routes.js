const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User.model')

//Middleware to protect routes
const checkLoggedInUser = (req, res, next) => {
  if (req.session.userData) {
    next()
  }
  else {
    res.redirect('/login')
  }
}

router.get('/profile', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  res.render('profile.hbs', {user})
})

router.get('/main', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  res.render('main.hbs', {user})
})

// router.get('/private', checkLoggedInUser, (req, res, next) => {
//   res.render('auth/private.hbs')
// })

module.exports = router
