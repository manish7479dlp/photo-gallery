const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

//middleware

//to enable cross origin resouce sharing
app.use(cors());
app.use(express.json({limit: '50mb'}));

const fullPath = path.join(__dirname, "../upload");
// console.log(fullPath);
app.use("/upload", express.static(fullPath));
app.use("/", express.static(path.join(__dirname , "../dist")))
// console.log(path.join(__dirname , "../dist"))

// route import

const userRoute = require("./routes/user.routes");

app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send("hlw from the other side..");
});

app.get("*", (req, res) => {
  res.send("invalid routes");
});

module.exports = { app };
