const staffModel = require("../models/staffModel.js")
const staffController = {
  getStaffLoginPage: (req, res, next) => {
    try {
      if (req.session.userName && req.session.password)
        return res.redirect("/staff/dashboard")
      res.render("staff/staff-login.ejs")
    } catch (error) {
      console.log(error)
    }
  },

  getStaffDashboard: (req, res, next) => {
    try {
      res.render("staff/staff-dashboard.ejs", {
        loggedInYear: JSON.stringify(req.session.userName),
      })
    } catch (error) {
      console.log(error)
    }
  },

  saveStudentData: async (req, res, next) => {
    try {
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
      let year = req.query.year
      let department = req.query.department
      console.log(year, department, '-this')

      let _studentsListResponse = await staffModel.getStudentsList(department,year)
      console.log(_studentsListResponse[0], 'this----')
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

  deleteStudent: async (req, res, next) => {
    try {
      let _studentDeleteRes = await staffModel.deleteStudent(req.body.deleteId)
      if (_studentDeleteRes[0].affectedRows == 1) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Deleted Student Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  getSubList: async (req, res, next) => {
    try {
      let department = req.query.department
      let year = req.query.year
      let _subListRes = await staffModel.getSubList(department, year)
      return res.status(200).json({
        success: true,
        status: 200,
        message: "Subjects List",
        data: _subListRes[0],
      })
    } catch (error) {
      console.log(error)
    }
  },
  addSubject: async (req, res, next) => {
    try {
      let data = req.body
      let _addSubResponse = await staffModel.addSubject(data)
      if (_addSubResponse[0].affectedRows === 1) {
        return res.status(201).json({
          success: true,
          status: 201,
          message: "Added Subject Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  deleteSubject: async (req, res, next) => {
    try {
      let _deleteSubRes = await staffModel.deleteSubject(req.body.deleteId)
      if (_deleteSubRes[0].affectedRows === 1) {
        return res.status(201).json({
          success: true,
          status: 200,
          message: "Deleted Subject Successfully",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },

  // staff authentication
  loginStaff: async (req, res, next) => {
    try {
      let _staffLoginDetails = await staffModel.loginStaff(req.body)

      if (_staffLoginDetails[0].length == 0) {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Unauthorized",
        })
      }
      if (_staffLoginDetails[0].length >= 1) {
        req.session.userName = _staffLoginDetails[0][0].username
        req.session.password = _staffLoginDetails[0][0].password
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Authorized",
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
}

module.exports = staffController
