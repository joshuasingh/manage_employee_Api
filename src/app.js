const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const db = require("./configuration/sqlConnection");

db.authenticate()
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error is ", err));

//companyRoute

app.use(cookieParser());
app.use(bodyparser());

app.use("/Company", require("./routes/Company"));

app.get("/", (req, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT;

app.listen(PORT, console.log("the server is running"));
