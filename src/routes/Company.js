const express = require("express");
const router = express.Router();
const db = require("../configuration/sqlConnection");
const Company = require("../models/Company");
const { QueryTypes } = require("sequelize");
const { getHashedPassword } = require("../common/HelperFunction");
const { isUserNameUnique, verifyAccount } = require("../DataAccess/Company");
const { errorMessages } = require("../common/constant");

//get all companies
router.get("/getAll", async (req, res) => {
  try {
    let companiesList = await Company.findAll({
      attributes: ["companyid", "companyname", "companyaddress"],
    });

    res.status(200).json({ data: companiesList });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

//add new company
router.post("/addCompany", async (req, res) => {
  try {
    let { companyName, companyAddress, userName, password } = req.body;

    if (await isUserNameUnique(userName)) {
      let hashPassword = getHashedPassword(password);

      await db.query(
        `insert into companies(companyname,companyaddress,username,password) values('${companyName}','${companyAddress}','${userName}','${hashPassword}')`,
        { types: QueryTypes.INSERT }
      );

      res.status(200).json({ isCompanyUpdated: true });
    } else {
      res.status(201).json({ error: errorMessages.company.userNameExist });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//login company user
router.post("/SignIn", async (req, res) => {
  try {
    let { userName, password } = req.body;

    let token = await verifyAccount(userName, password);

    if (token === null) {
      res
        .status(400)
        .json({ error: errorMessages.company.invalidLoginCredential });
    } else {
      res.setHeader(
        "Set-Cookie",
        "visited=true; Max-Age=3000; HttpOnly, Secure"
      );
      res.cookie("cookieName", "1", {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });

      res.status(200).json({ token: token });
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
