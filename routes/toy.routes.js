const router = require('express').Router()
const ToyModel = require('../models/Toy.model');
const UserModel = require('../models/User.model')
const uploader = require('../config/cloudinary.config');


const checkLoggedInUser = (req, res, next) => {
  if (req.session.userData) {
    next()
  } else {
    res.redirect('/login')
  }
}
router.get('/toypage/:id', checkLoggedInUser, (req, res, next) => {
  let id = req.params.id
  let user = req.session.userData
  ToyModel.findById(id)
    .then((toy) => {
      UserModel.findById(toy.myOwner)
        .then((owner) => {
          let bool = user._id == owner._id
          let data = {
            user,
            toy,
            owner,
            bool
          }
          res.render('toypage.hbs', {
            data
          })
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.get("/addtoy", checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  let data = {
    user
  }
  res.render("add-toy.hbs", {
    data
  })
})

router.post("/addtoy", checkLoggedInUser, uploader.single("imageUrl"), (req, res, next) => {
  let user = req.session.userData

  const {
    name,
    description,
    category,
    ageRange,
    switchMode
  } = req.body

  // if (!name.length || !description.length || !category.length || !ageRange.length || !switchMode.length) {
  //   res.redirect('/addtoy', { msg: 'Please enter all fields' })
  //   return;
  // }

  let newToy = {
    name,
    description,
    category,
    ageRange,
    switchMode,
    myOwner: user._id,
    city: user.city,
    photos: [req.file.path]
  }

  ToyModel.create(newToy)
    .then(() => {
      res.redirect('/profile')
    })
    .catch(() => {
      res.render('not-authorised.hbs')
    })

})

router.post('upload', checkLoggedInUser, uploader.single("imageUrl"), (req, res, next) => {
  ToyModel.findByIdAndUpdate(req.session.ToyModel._id, {
      $push: {
        photos: req.file.path
      }
    })
    .then(() => {
      res.redirect('/toypage')
    })
    .catch(() => {
      res.redirect('/error')
    })
})

router.get('/edittoy/:id', checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  let id = req.params.id;

  ToyModel.findById(id)
    .then((toy) => {
      UserModel.findById(toy.myOwner)
        .then((owner) => {
          if (user._id == owner._id) {
            let data = {
              user,
              toy
            }
            res.render('edit-toy.hbs', {
              data
            })
          } else {
            res.render("not-authorised.hbs")
          }

        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.post("/edittoy/:id", checkLoggedInUser, (req, res, next) => {
  let user = req.session.userData
  let id = req.params.id;

  const {
    name,
    description,
    category,
    ageRange,
    switchMode
  } = req.body
  // if (!name.length || !description.length || !category.length || !ageRange.length || !switchMode.length) {
  //   res.redirect('/edittoy/'+id, { msg: 'Please enter all fields' })
  //   return;
  // }
  let updatedToy = {
    name,
    description,
    category,
    ageRange,
    switchMode,
    myOwner: user._id,
    city: user.city,
  }
  ToyModel.findByIdAndUpdate(id, updatedToy)
    .then(() => {
      res.redirect('/profile')
    })
    .catch(() => {
      res.render('not-authorised.hbs')
    })
})

router.get('/deletetoy/:id', checkLoggedInUser, (req, res, next) => {
  let id = req.params.id;
  ToyModel.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/profile")
    })
    .catch((err) => {
      res.redirect("/not-authorised")
    })
})

router.get("/deletephoto/:toyId/:photoIndex", checkLoggedInUser, (req, res, next) => {
  let toyId = req.params.toyId;
  let photoIndex = req.params.photoIndex;
  console.log(photoIndex)
  console.log(toyId, photoIndex)
  ToyModel.findById(toyId)
    .then((toy) => {
      let photos = toy.photos.filter((item, index) => (index != photoIndex));
      console.log(photos)
      ToyModel.findByIdAndUpdate(toyId, {
          photos: photos
        })
        .then((toy) => {
          res.redirect("/edittoy/" + toyId);
        })
        .catch((err) => {
          res.redirect("error")
        })
    })


    .catch((err) => {
      res.redirect("error")
    })

})

router.post('/addphoto/:toyId', checkLoggedInUser, uploader.single("imageUrl"), (req, res, next) => {
  let toyId = req.params.toyId;
  ToyModel.findByIdAndUpdate(toyId, {
      $push: {
        photos: req.file.path
      }
    }, {
      new: true
    })
    .then(() => {
      res.redirect('/edittoy/' + toyId)
    })
    .catch(() => {
      res.redirect('/error')
    })
})

module.exports = router