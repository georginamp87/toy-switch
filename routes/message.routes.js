const router = require('express').Router()
const ToyModel = require('../models/Toy.model');
const MessageModel = require('../models/Message.model');
const UserModel = require('../models/User.model');
const { isValidObjectId } = require('mongoose');


const checkLoggedInUser = (req, res, next) => {
  if (req.session.userData) {
    next()
  }
  else {
    res.redirect('/login')
  }
}
router.post('/sendmessage/:toyId', checkLoggedInUser, (req, res, next) => {
  console.log("jorgjidpsjfg")
  const {text} = req.body;
  let toyId=req.params.toyId;
 let sender = req.session.userData
 ToyModel.findById(toyId)
 .then((toyRelated)=> {
   let receiver=toyRelated.myOwner;
   let between=[sender,receiver]
   let message = {between,text,toyRelated}
   MessageModel.create(message)
    .then(()=>{
      let bool=false
      let msg="Your message has been sent."
      let data = {user:sender, toy:toyRelated, owner:receiver, bool, msg}
      res.render('toypage.hbs', {data})
    })
    .catch((err)=>{
      next(err)
    })
 
 })
 .catch((err)=> {
  next(err)
  })
})

router.get('/messages', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData;
  let list=[];
  let contacts=[]
 MessageModel.find( { between: user._id } )
 .then((allmessages)=> {



   allmessages.forEach(ms => {

    let contact=(ms.between[0]==user._id)?ms.between[1]:ms.between[0]
     if(list[contact._id]){
     
     }else{

      
       contacts.push(contact._id)
       list[contact._id]=[ms];
     }
    
     
   });
   let data=[]
   Object.keys(list).forEach(key=>{



    list[key].text//means list.rasgdahşshşfghşsf


   })

  
 

   res.json(list)







 })
 .catch((err)=> {
  next(err)
  })
})

module.exports = router