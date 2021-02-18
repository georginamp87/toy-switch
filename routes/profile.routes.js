const router = require('express').Router();
const ToyModel = require('../models/Toy.model');
const UserModel = require('../models/User.model');
const uploader = require('../config/cloudinary.config');

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
   res.render('profile.hbs', {data})
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/editprofile', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
    let data = {user}
   res.render('edit-profile.hbs', {data})
})

router.post('/editprofile', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData;
  const { name, lastName, city, email} = req.body

  if (!name.length || !lastName.length || !email.length || !city.length) {
    res.render('edit-profile', { msg: 'Please enter all fields' })
    return;
  }
  let regexEmail = /\S+@\S+\.\S+/;
  if (!regexEmail.test(email)) {
    res.render('edit-profile', { msg: 'Email is not a valid format' })
    return;
  }
  if(user.email!=email){
    UserModel.findOne({email})
    .then((oneUser) => {
      if (oneUser) {
        res.render('edit-profile', {
          msg: "Email is already related with another account!"
        })
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      return;
    })
  }
  
  let updatedUser={name,lastName, city, email}
  UserModel.findByIdAndUpdate(user._id, updatedUser,{new: true})
  .then((user)=>{
    req.session.userData = user
    console.log(user)
   res.redirect("/profile")
  })
  .catch((err)=>{
    next(err)
  })
})

router.get('/addprofilephoto', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  let data = {user}
   res.render('addprofilephoto.hbs', {data})
  
})

router.post('/addprofilephoto', checkLoggedInUser, uploader.single("imageUrl"), (req, res, next) => {
  console.log(req.file.path)
  UserModel.findByIdAndUpdate(req.session.userData._id,  { photo: req.file.path },{new:true})
  .then((result)=> {
    req.session.userData = result
    res.redirect('/profile')
  })
  .catch(()=> {
    res.redirect('/error')
  })
})

module.exports = router