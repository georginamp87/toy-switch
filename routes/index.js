const router = require("express").Router();

const checkBeforeLogin = (req, res, next) => {
  if (req.session.userData) {
    res.redirect('/main')
  }
  else {
    next()
  }
}

/* GET home page */
router.get("/",checkBeforeLogin, (req, res, next) => {
  res.render("index");
});

module.exports = router;
