const express = require("express");
const app = express();
const PORT = 2002;

const cors = require("cors");

const path = require("path");
const fs = require("fs");

app.use(cors());

app.get("/", async (req, res, next) => {
  try {
    let response = await fetch("http://192.168.1.4:2001/");
    const headers = response.headers;
    let totalFileSize = headers.get("Content-Length");
    let downloadStartProgress = 0;
    let downloadPercentage = 0;
    let fileType;
    if (headers.get("Content-Type") === "application/pdf") fileType = ".pdf";

    let reader = response.body.getReader();
    const chunks = [];
    while (true) {
      const r = await reader.read();
      if (r.done) {
        console.log("Done");
        break;
      }
      chunks.push(r.value);
      downloadStartProgress += r.value.byteLength;
      downloadPercentage = (
        (downloadStartProgress / totalFileSize) *
        100
      ).toFixed(1);
      console.log(downloadPercentage);
    }
    console.log(chunks);
    let blob = new Blob(chunks, {type: 'application/pdf'})
    const buff = Buffer.from(await blob.arrayBuffer());
    fs.writeFile('omkar-2.zip', buff,(err)=> console.log(err))


  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
