const constants = require("./constants/constant");
const controller = require("./app/auth/auth.controller");
const forgetController = require("./app/auth/forget.controller");
const { Auth } = require("./app/auth/auth.middleware");
const userController = require("./app/user/user.controller");

const salesController = require("./app/sales/sales.controller");
const manufacturerController = require("./app/manufacturer/manufacturer.controller");
const genericNameController = require("./app/genericName/genericName.controller");
const categoryController = require("./app/category/category.controller");
const supplierController = require("./app/supplier/supplier.controller");
const medicineController = require("./app/medicine/medicine.controller");
const batchController = require("./app/batch/batch.controller");
const statsController = require("./app/stats/stats.controller");
const logsController = require("./app/audit-logs/auditLogs.controller");

module.exports = function (app) {
  app.use(`${constants.API_PREFIX}/auth`, controller);
  app.use(`${constants.API_PREFIX}/user`, Auth, userController);
  app.use(`${constants.API_PREFIX}/forget`, forgetController);
  app.use(`${constants.API_PREFIX}/sales`, Auth, salesController);
  app.use(`${constants.API_PREFIX}/manufacturer`, Auth, manufacturerController);
  app.use(`${constants.API_PREFIX}/generic-name`, Auth, genericNameController);
  app.use(`${constants.API_PREFIX}/category`, Auth, categoryController);
  app.use(`${constants.API_PREFIX}/supplier`, Auth, supplierController);
  app.use(`${constants.API_PREFIX}/medicine`, Auth, medicineController);
  app.use(`${constants.API_PREFIX}/batch`, Auth, batchController);
  app.use(`${constants.API_PREFIX}/stats`, Auth, statsController);
  app.use(`${constants.API_PREFIX}/logs`, Auth, logsController);
};
