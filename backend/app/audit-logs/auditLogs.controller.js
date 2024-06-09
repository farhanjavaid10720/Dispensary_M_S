const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");
/* Controller Endpoints */
const auditLogsService = require("./auditLogs.service");
router.get("/", (req, res) => {
  GenerateResponse(auditLogsService.getAllauditLogss(), res);
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(auditLogsService.getauditLogsById(id), res);
});
router.post("/", async (req, res) => {
  const auditLogs = req.body;
  let result = await auditLogsService.addNewauditLogs(auditLogs);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const auditLogs = req.body;
  const id = req.params.id;
  let result = await auditLogsService.updateauditLogsData(id, auditLogs);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await auditLogsService.deleteauditLogsData(id);
  res.send(result);
});

module.exports = router;
