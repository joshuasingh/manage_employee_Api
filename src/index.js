require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT;

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
