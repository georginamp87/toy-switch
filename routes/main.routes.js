const router = require('express').Router()
const bcrypt = require('bcryptjs');
const ToyModel = require('../models/Toy.model');
const UserModel = require('../models/User.model')

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

  
  ToyModel.find({myOwner:user._id})
  .then((toyResults)=>{
    let data = {user, toyResults}
   console.log(toyResults.length)
   res.render('profile.hbs', {data})
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/editprofile', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData

  
  ToyModel.find({myOwner:user._id})
  .then((toyResults)=>{
    let data = {user, toyResults}
   console.log(toyResults.length)
   res.render('profile.hbs', {data})
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/main', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
 ToyModel.find()
  .then((allToys)=>{
    let toyResults=(req.query.searchedToy)?
    allToys.filter(toy=>toy.name.toLowerCase().includes(req.query.searchedToy.toLowerCase())):allToys.filter(item=>item.city==user.city)
     let data = {user, toyResults}
     res.render('main.hbs', {data})
  })
  .catch((err)=>{
    next(err)
  })
})



module.exports = router