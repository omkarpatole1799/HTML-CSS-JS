const express = require("express")

const router = express.Router()
const staffController = require("../../application/controllers/staffController.js")

const isAuth = require("../middlewares/isAuth.js")

router.get("/login-page", staffController.getStaffLoginPage)

router.get("/dashboard", isAuth, staffController.getStaffDashboard)

router.post("/save-student", isAuth, staffController.saveStudentData)

router.get("/students-list", isAuth, staffController.getStudentsList)

router.delete("/delete-student", isAuth, staffController.deleteStudent)

router.get("/subject-list", isAuth, staffController.getSubList)
router.post("/add-subject", isAuth, staffController.addSubject)
router.delete("/delete-subject", isAuth, staffController.deleteSubject)

// authentication of staff
router.post("/login", staffController.loginStaff)

module.exports = router
