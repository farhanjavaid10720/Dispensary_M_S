const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");

/* Controller Endpoints */
const genericNameService = require("./genericName.service");
router.get("/", (req, res) => {
  GenerateResponse(genericNameService.getAllgenericNames(), res);
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(genericNameService.getgenericNameById(id), res);
});
router.post("/", async (req, res) => {
  const genericName = req.body;
  let result = await genericNameService.addNewgenericName(genericName);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const genericName = req.body;
  const id = req.params.id;
  let result = await genericNameService.updategenericNameData(id, genericName);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await genericNameService.deletegenericNameData(id);
  res.send(result);
});

module.exports = router;
