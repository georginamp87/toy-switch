const router = require('express').Router()
const ToyModel = require('../models/Toy.model');
const MessageModel = require('../models/Message.model');

const checkLoggedInUser = (req, res, next) => {
  if (req.session.userData) {
    next()
  }
  else {
    res.redirect('/login')
  }
}

router.post('/sendmessage/:toyId', checkLoggedInUser, (req, res, next) => {
  const { text } = req.body;
  let toyId = req.params.toyId;
  let sender = req.session.userData
  ToyModel.findById(toyId)
    .then((toyRelated) => {
      let receiver = toyRelated.myOwner;
      let between = [sender, receiver]
      let message = { between, text, toyRelated }
      MessageModel.create(message)
        .then(() => {
          let bool = false
          let msg = "Your message has been sent."
          let data = { user: sender, toy: toyRelated, owner: receiver, bool, msg }
          res.render('toypage.hbs', { data })
        })
        .catch((err) => {
          next(err)
        })

    })
    .catch((err) => {
      next(err)
    })
})

router.get('/messages', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData;
  let list = [];
  let contacts = [];
  MessageModel.find({ between: user._id })
    .populate({
      path: 'toyRelated',
      select: "photos name"

    })
    .populate({
      path: 'between',
      model: 'user',
      select: 'name lastName'
    })
    .then((allmessages) => {
      let dtos = []
      allmessages.forEach(ms => {

        let contact = (ms.between[0]._id == user._id) ? ms.between[1] : ms.between[0]

        if (!contacts.includes(contact._id)) {
          let dto = {
            contactId: contact._id,
            contactName: contact.name,
            contactLastName: contact.lastName,
            toyName: ms.toyRelated.name,
            date: ms.date.toString().substring(4, 9) + ms.date.toString().substring(14, 21),
            photoUrl: ms.toyRelated.photos[0],
            text: ms.text
          }
          contacts.push(contact._id)
          dtos.push(dto)
        }
      });
      let data = {
        dtos,
        user
      }
      res.render("messages.hbs", { data })

    })

    .catch((err) => {
      next(err)
    })
})

router.get('/messageswith/:id', checkLoggedInUser, (req, res, next) => {
  let contactId = req.params.id;
  let user = req.session.userData;
  MessageModel.find({
    $and: [{ between: user._id }, { between: contactId }]
  })
    .populate({
      path: 'toyRelated',
      select: "photos name"

    })
    .populate({
      path: 'between',
      model: 'user',
      select: 'name lastName'
    })
    .then((allMessages) => {
      let messInfos = [];
      allMessages.forEach(ms => {
        let messInfo = {
          text: ms.text,
          date: ms.date,
          isItMein: (user._id == ms.between[0]._id) ? true : false,
        }
        messInfos.push(messInfo);
      })
      let data = {
        messInfos,
        user,
        photoUrl: allMessages[0].toyRelated.photos[0],
        contactName: (user._id == contactId) ? allMessages[0].between[0].name : allMessages[0].between[1].name,
        contactLastName: (user._id == contactId) ? allMessages[0].between[0].lastName : allMessages[0].between[1].lastName,
        contactId: contactId,
        toyName: allMessages[0].toyRelated.name,
        toyId: allMessages[0].toyRelated._id
      }
      console.log(data.toyId)
      res.render("messages-with", { data })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/answermessage/:contactId/:toyId', checkLoggedInUser, (req, res, next) => {
  let contactId = req.params.contactId;
  let toyId = req.params.toyId;
  const { text } = req.body;
  let sender = req.session.userData


  let between = [sender._id, contactId]
  let message = { between, text, toyRelated: toyId }
  MessageModel.create(message)
    .then(() => {
      res.redirect("/messageswith/" + contactId)
    })
    .catch((err) => {
      next(err)
    })

    .catch((err) => {
      next(err)
    })
})

module.exports = router