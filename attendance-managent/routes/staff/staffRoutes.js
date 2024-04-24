const express = require("express")

const router = express.Router()
const staffController = require("../../application/controllers/staffController.js")

router.get("/login", staffController.getStaffLoginPage)

router.get("/dashboard", staffController.getStaffDashboard)

router.post("/save-student", staffController.saveStudentData)

router.get('/students-list', staffController.getStudentsList)

module.exports = router
