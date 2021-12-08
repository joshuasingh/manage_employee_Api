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

exports.generateWebToken = (userName, companyId) => {
  let token = jwt.sign(
    {
      data: companyId + "",
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "3h" }
  );

  return token;
};

exports.verifyToken = (tokenString) => {
  return new Promise((resolve, reject) => {
    if (tokenString === undefined) {
      resolve(false);
    } else {
      jwt.verify(
        tokenString,
        process.env.TOKEN_SECRET,
        function (err, decoded) {
          if (err) {
            resolve(false);
          } else {
            console.log(decoded);
            resolve(decoded);
          }
        }
      );
    }
  });
};
