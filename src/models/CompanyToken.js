const Sequelize = require("sequelize");

const db = require("../configuration/sqlConnection");

const Companies = db.define("CompanyToken", {
  tokenId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  companyId: {
    type: Sequelize.INTEGER,
  },
  token: {
    type: Sequelize.STRING,
  },
  companyId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CompanyToken;
