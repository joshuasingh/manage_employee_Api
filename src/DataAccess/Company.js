const db = require("../configuration/sqlConnection");
const { QueryTypes } = require("sequelize");
const { verifyPassword } = require("../common/HelperFunction");
const { generateWebToken } = require("../common/HelperFunction");

exports.isUserNameUnique = async (userName) => {
  const result = await db.query(
    `select count(*) as count from Companies where username='${userName}'`,
    { types: QueryTypes.SELECT }
  );

  return result.length !== 0 ? result[0][0].count === "0" : true;
};

exports.verifyAccount = async (userName, password) => {
  if (userName.length === 0) {
    throw new Error("user name not provided");
  }

  let passwordHash = await getCompanyPassword(userName);

  if (passwordHash === null) {
    return null;
  }

  let isCredentialVerified = verifyPassword(password, passwordHash);

  if (isCredentialVerified) {
    return generateWebToken(userName);
  } else {
    return null;
  }
};

const getCompanyPassword = async (userName) => {
  let sql = `select password from Companies where username='${userName}'`;
  const result = await db.query(sql, { types: QueryTypes.SELECT });
  return result[0].length === 0 ? null : result[0][0].password;
};
