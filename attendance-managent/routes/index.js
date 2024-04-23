const express = require("express")
const router = express.Router()

const studentRouter = require("./students/studentRoutes.js")
const staffRouter = require("./staff/staffRoutes.js")

router.use("/student", studentRouter)
router.use("/staff", staffRouter)

module.exports = router
