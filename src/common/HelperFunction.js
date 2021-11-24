const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getHashedPassword = (passwordString) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(passwordString, salt);

  return hash;
};

exports.verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

exports.generateWebToken = (userName) => {
  let token = jwt.sign(
    {
      data: userName,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "3h" }
  );

  return token;
};
