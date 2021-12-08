const express = require("express");
const router = express.Router();
const db = require("../configuration/sqlConnection");
const Company = require("../models/Company");
const { QueryTypes } = require("sequelize");
const { getHashedPassword } = require("../common/HelperFunction");
const {
  isUserNameUnique,
  verifyAccount,
  createNewDataBaseForCompany,
} = require("../DataAccess/Company");
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

router.post("/checkUsername", async (req, res) => {
  try {
    let { userName } = req.body;

    if (userName) {
      var isNameUnique = await isUserNameUnique(userName);
    } else {
      throw new error();
    }

    res.status(200).json({ isUnique: isNameUnique });
  } catch (e) {
    res.status(500).json({ error: "Unable to check Username" });
  }
});

//add new company
router.post("/addCompany", async (req, res) => {
  try {
    let { companyName, email, userName, password } = req.body;

    if (await isUserNameUnique(userName)) {
      let hashPassword = getHashedPassword(password);

      await db.query(
        `insert into companies(companyname,email,username,password) values('${companyName}','${email}','${userName}','${hashPassword}')`,
        { types: QueryTypes.INSERT }
      );

      //add here the New DB creation
      //await createNewDataBaseForCompany("ww1");

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
      const oneDayToSeconds = 24 * 60 * 60;
      res.cookie("Comp_Token", token, {
        maxAge: oneDayToSeconds,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      res.status(200).json({ loggedIn: true });
    }
  } catch (e) {
    res.status(400).json({ error: "Unable to SignIn" });
  }
});

module.exports = router;
