const express = require("express")();
const { verifyToken } = require("../common/HelperFunction");

exports.TokenAuthorize = async (req, res, next) => {
  try {
    let { Comp_Token } = req.cookies;

    let validToken = await verifyToken(Comp_Token);
    if (validToken) {
      req.companyId = validToken.data;
    } else {
      res.status(500).json({ error: "Authorization failed" });
    }

    next();
  } catch (e) {
    res.status(500).json({ error: "Authorization failed" });
  }
};
