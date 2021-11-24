const Sequelize = require("sequelize");

const db = require("../configuration/sqlConnection");

const Companies = db.define("CompanyLogin", {
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  companyId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CompanyLogin;
