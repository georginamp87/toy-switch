const router = require('express').Router()
const bcrypt = require('bcryptjs');
const ToyModel = require('../models/Toy.model');
const UserModel = require('../models/User.model')

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
  let toyResults
  ToyModel.find()
  .then((allToys)=>{
   toyResults=allToys
  })
  .catch((err)=>{
    next(err)
  })
  let data = {user, toyResults}
  res.render('profile.hbs', {data})
})


router.get('/main', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
 ToyModel.find()
  .then((allToys)=>{
    let toyResults=(req.query.searchedToy)?
    allToys.filter(toy=>toy.name.toLowerCase().includes(req.query.searchedToy.toLowerCase())):allToys
     let data = {user, toyResults}
     res.render('main.hbs', {data})

  })
  .catch((err)=>{
    next(err)
  })

 
})



// router.get('/private', checkLoggedInUser, (req, res, next) => {
//   res.render('auth/private.hbs')
// })

module.exports = router
