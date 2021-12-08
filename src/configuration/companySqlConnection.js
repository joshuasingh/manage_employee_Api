require("dotenv").config();
const Sequelize = require("sequelize");

exports.getCompanyDBConnection = (companyId) => {
  return new Sequelize("empr000" + companyId, "postgres", "joshuasingh@1995", {
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: false,
    port: 5433,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
};
