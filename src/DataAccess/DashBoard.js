const { QueryTypes } = require("sequelize");
const { verifyPassword } = require("../common/HelperFunction");
const { generateWebToken } = require("../common/HelperFunction");
const e = require("express");

exports.getMenuItems = async (subscription, db) => {
  const sql =
    `select DM.DashBoardItem from dashboardMenu DM inner join Subscription_MenuItem SM on ` +
    `DM.Id=SM.DashBoardItemId inner join Subscription SS on SM.SubscriptionId=SS.Id` +
    ` where SS.subscription='${subscription}'`;

  const result = await db.query(sql, { types: QueryTypes.SELECT });

  return result[0];
};

exports.getSubscription = async (db) => {
  const sql = `
    select subscription from subscription SS inner join company CC on CC.SubscriptionId=SS.Id`;

  const result = await db.query(sql, { types: QueryTypes.SELECT });

  return result[0][0].subscription;
};
