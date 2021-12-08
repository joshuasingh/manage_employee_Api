const { getSubscription } = require("../DataAccess/DashBoard");

const {
  getCompanyDBConnection,
} = require("../configuration/companySqlConnection");

exports.InitializeCompanyDB = async (req, res, next) => {
  const companyId = req.companyId;

  //setting companyId 1 as constant for now
  req.dbConnection = getCompanyDBConnection(1);
  req.subscription = await getSubscription(req.dbConnection);
  next();
};
