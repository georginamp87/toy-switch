const router = require('express').Router()
const ToyModel = require('../models/Toy.model');
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

const checkLoggedInUser = (req, res, next) => {
  if (req.session.userData) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/home', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  ToyModel.find()
    .then((allToys) => {
      let toyResults = (req.query.searchedToy) ?
        allToys.filter(toy => toy.name.toLowerCase().includes(req.query.searchedToy.toLowerCase())) : allToys.filter(item =>
          (item.city == user.city || (item.city == "Paris" && user.city == "Versailles") || (user.city == "Paris" && item.city == "Versailles")))

      toyResults.map(toy => {
        toy.name = capitalized(toy.name);
        toy.description = capitalized(toy.description);
        toy.switchMode = capitalized(toy.switchMode);
        return toy;
      })
      let data = {
        user,
        toyResults
      }
      res.render('home.hbs', {
        data
      })
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/home/:mode', checkLoggedInUser, (req, res, next) => {

  let user = req.session.userData
  let mode = req.params.mode
  ToyModel.find({
      switchMode: mode,
      city: user.city
    })
    .then((toyResults) => {

      toyResults.map(toy => {
        toy.name = capitalized(toy.name);
        toy.description = capitalized(toy.description);
        return toy;
      })
      let data = {
        user,
        toyResults
      }
      res.render('home.hbs', {
        data
      })
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router