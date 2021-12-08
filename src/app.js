const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const db = require("./configuration/sqlConnection");

db.authenticate()
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error is ", err));

const app = express();

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

//companyRoute

app.use(cookieParser());
app.use(bodyparser());
app.use(cors(corsOptions));
//app.use(cors());

app.use("/Company", require("./routes/Company"));
app.use("/dashboard", require("./routes/DashBoard"));

app.get("/", (req, res) => {
  res.send("server is running");
});

const PORT = process.env.PORT;

app.listen(PORT, console.log("the server is running"));
