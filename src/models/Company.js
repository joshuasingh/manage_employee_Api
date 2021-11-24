const Sequelize = require("sequelize");

const db = require("../configuration/sqlConnection");

const Companies = db.define("companies", {
  companyid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  companyname: {
    type: Sequelize.STRING,
  },
  companyaddress: {
    type: Sequelize.STRING,
  },
  userName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = Companies;
