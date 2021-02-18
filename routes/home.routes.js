const router = require('express').Router()
const ToyModel = require('../models/Toy.model');

const checkLoggedInUser = (req, res, next) => {
  if (req.session.userData) {
    next()
  }
  else {
    res.redirect('/login')
  }
}

router.get('/home', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
 ToyModel.find()
  .then((allToys)=>{
    let toyResults=(req.query.searchedToy)?
    allToys.filter(toy=>toy.name.toLowerCase().includes(req.query.searchedToy.toLowerCase())):allToys.filter(item=>item.city==user.city)
     let data = {user, toyResults}
     res.render('home.hbs', {data})
  })
  .catch((err)=>{
    next(err)
  })
})

module.exports = router