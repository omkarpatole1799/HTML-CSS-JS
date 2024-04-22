const express = require("express");
const app = express();
const PORT = 2001;

const cors = require("cors");

const path = require("path");
const fs = require("fs");

app.use(cors());

app.get("/", (req, res, next) => {
  const filePath = path.resolve("omkar.zip");

  const stat = fs.statSync(filePath);
  console.log(stat);

  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Length": stat.size,
  });
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
