const router = require('express').Router()
const bcrypt = require('bcryptjs');
const User = require('../models/User.model')


const checkBeforeLogin = (req, res, next) => {
  if (req.session.userData) {
    res.redirect('/main')
  }
  else {
    next()
  }

}

router.get("/signup", (req, res, next) => {
  // Shows the sign up form to the user
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
  // Shows the sign up form to the user
  res.render('auth/login.hbs')
})

router.post("/login", (req, res, next) => {
  const { email, password } = req.body

  // implement the same set of validations as you did in signup as well
  // NOTE: We have used the Async method here. Its just to show how it works
  User.findOne({ email: email })
    .then((result) => {
      // if user exists
      if (result) {
        //check if the entered password matches with that in the DB
        bcrypt.compare(password, result.password)
          .then((isMatching) => {
            if (isMatching) {
              // when the user successfully signs up
              req.session.userData = result
              res.redirect('/main')
            }
            else {
              // when passwords don't match
              res.render('auth/login.hbs', { msg: 'Password is incorrect' })
            }
          })
      }
      else {
        // when the user signs in with a username that does not exist
        res.render('auth/signup.hbs', { msg: 'Email not registered, please sign up' })
      }
    })
    .catch((err) => {
      next(err)
    })

});



//router.get(path, callback,callback,callback,callback,callback)
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router