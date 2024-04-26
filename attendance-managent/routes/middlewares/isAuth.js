const isAuth = (req, res, next) => {
  req.session.userName = "BE"
  next()
  // if (!req.session.userName || !req.session.password) {
  //   // return res.redirect("/staff/login-page")

  //   next()
  // } else {
  //   next()
  // }
}

module.exports = isAuth
