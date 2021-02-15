const router = require('express').Router()
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
router.get('/toypage/:id', checkLoggedInUser, (req, res, next) => {
 let id=req.params.id
 let user = req.session.userData
 ToyModel.findById(id)
 .then((toy)=> {
   UserModel.findById(toy.myOwner)
   .then((owner)=> {
     let boolean=user._id==owner._id
     let data = {user, toy, owner, boolean}
     res.render('toypage.hbs', {data})
   })
   .catch((err)=> {
     next(err)
   })
 })
 .catch((err)=> {
  next(err)
  })
})

router.get('/deleteToy/:id', checkLoggedInUser, (req, res, next) => {
 let id=req.params.id;
 ToyModel.findByIdAndRemove(id)
 .then(()=> {
   res.redirect("/profile")
 })
 .catch((err)=>{
  res.redirect("/not-authorised")
 })
})

router.get("/addtoy", checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  let data={user}
  res.render("add-toy.hbs", {data})
})

router.post("/addtoy/", checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
   
  const {name, description, category, ageRange, gender, switchMode}=req.body
  let newToy={
    name,description, category, ageRange, gender, switchMode,
    myOwner:user._id,
    city:user.city
  }
  ToyModel.create(newToy)
  .then(()=> {
    res.redirect('/profile')
   })
  .catch(()=> {
    res.render('not-authorised.hbs')
  })

})

router.get('/edittoy/:id', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  let id=req.params.id;

 ToyModel.findById(id)
 .then((toy)=> {
   UserModel.findById(toy.myOwner)
   .then((owner)=> {
     if(user._id==owner._id){
      let data = {user, toy}
      res.render('edit-toy.hbs', {data})
     } else{
       res.render("not-authorised.hbs")
     }
     
   })
   .catch((err)=> {
     next(err)
   })
 })
 .catch((err)=> {
  next(err)
  })
})

router.post("/edittoy/:id", checkLoggedInUser,(req,res,next)=>{
  let user = req.session.userData
  let id=req.params.id;
  
  const {name, description, category, ageRange, gender, switchMode}=req.body
  let updatedToy={
    name,description, category, ageRange, gender, switchMode,
    myOwner:user._id,
    city:user.city
  }
  ToyModel.findByIdAndUpdate(id,updatedToy)
  .then(()=> {
    res.redirect('/profile')
   })
  .catch(()=> {
    res.render('not-authorised.hbs')
  })


  

})

module.exports = router
