const express = require("express");
const router = express.Router();
const db = require("../configuration/sqlConnection");
const Company = require("../models/Company");
const { QueryTypes } = require("sequelize");
const { getHashedPassword } = require("../common/HelperFunction");
const { isUserNameUnique, verifyAccount } = require("../DataAccess/Company");
const { errorMessages } = require("../common/constant");
const { TokenAuthorize } = require("../Middleware/TokenAuthorize");
const {
  InitializeCompanyDB,
} = require("../Middleware/InitializeRouterConfiguration");
const { getMenuItems } = require("../DataAccess/DashBoard");

router.use(TokenAuthorize);
router.use(InitializeCompanyDB);

//get all companies
router.get("/getDashBoardMenu", async (req, res) => {
  const { dbConnection, subscription } = req;

  try {
    const result = await getMenuItems(subscription, dbConnection);

    res.status(200).json({ dashItems: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
