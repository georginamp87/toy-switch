const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User.model')

const checkBeforeLogin = (req, res, next) => {
  if (req.session.userData) {
    res.redirect('/home')
  }
  else {
    next()
  }
}

router.get("/signup", checkBeforeLogin, (req, res, next) => {
  res.render('auth/signup.hbs')
});

router.post("/signup", (req, res, next) => {
  const { name, lastName, email, password, city } = req.body

  if (!name.length || !lastName.length || !email.length || !password.length || !city.length) {
    res.render('auth/signup', { msg: 'Please enter all fields' })
    return;
  }

  let regexEmail = /\S+@\S+\.\S+/;
  if (!regexEmail.test(email)) {
    res.render('auth/signup', { msg: 'Email is not a valid format' })
    return;
  }
  User.findOne({email})
    .then((oneUser) => {
      if (oneUser) {
        res.render("auth/login", {
          msg: "Email already signed up, please log in"
        })
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    })

  let regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regexPass.test(password)) {
    res.render('auth/signup', { msg: 'Password needs some numbers, an Uppercase, a Lowercase and be 6 characters minimum' })
    return;
  }

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  User.create({ name, lastName, email, password: hash, city })
    .then((oneUser) => {
      res.redirect('/login')
    })
    .catch((err) => {
      next(err)
    })
})

router.get("/login", checkBeforeLogin, (req, res, next) => {
  res.render('auth/login.hbs')
})

router.post("/login", (req, res, next) => {
  const { email, password } = req.body

  User.findOne({ email: email })
    .then((result) => {
      if (result) {
        bcrypt.compare(password, result.password)
          .then((isMatching) => {
            if (isMatching) {
              req.session.userData = result
              res.redirect('/home')
            }
            else {
              res.render('auth/login.hbs', { msg: 'Password is incorrect' })
            }
          })
      }
      else {
        res.render('auth/signup.hbs', { msg: 'Email not registered, please sign up' })
      }
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router