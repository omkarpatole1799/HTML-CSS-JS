const staffModel = require("../models/staffController.js")
const staffController = {
  getStaffLoginPage: (req, res, next) => {
    try {
      res.render("staff/staff-login.ejs")
    } catch (error) {
      console.log(error)
    }
  },

  getStaffDashboard: (req, res, next) => {
    try {
      res.render("staff/staff-dashboard.ejs")
    } catch (error) {
      console.log(error)
    }
  },

  saveStudentData: (req, res, next) => {
    try {
      console.log(req.body, "-this")
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = staffController
