const express = require("express")
const app = express()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config()

// view engine
app.set("view engine", "ejs")

// view dir
app.set("views", path.join(__dirname, "/application/views"))

// json parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// static files
app.use(express.static("public"))

// routes
const indexRoutes = require("./routes/index.js")

app.use(indexRoutes)

let port = process.env.PORT
app.listen(port, () => console.log("Server started on port", port))
