const staffModel = require("../models/staffModel.js")
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

  saveStudentData: async (req, res, next) => {
    try {
      console.log(req.body, "-this")
      let _saveDataResponse = await staffModel.saveStudentData(req.body)

      if (_saveDataResponse[0].affectedRows == 1) {
        return res.status(200).json({
          success: true,
          status: 201,
          message: "Student added succesfully.",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  getStudentsList: async (req, res, next) => {
    try {
      let _studentsListResponse = await staffModel.getStudentsList()
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Students list",
        data: _studentsListResponse[0],
      })
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = staffController
