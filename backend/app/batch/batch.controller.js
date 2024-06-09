const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");

/* Controller Endpoints */
const batchService = require("./batch.service");
router.get("/", (req, res) => {
  GenerateResponse(batchService.getAllbatchs(), res);
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(batchService.getbatchById(id), res);
});
router.post("/", async (req, res) => {
  const batch = req.body;
  let result = await batchService.addNewbatch(batch);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const batch = req.body;
  const id = req.params.id;
  let result = await batchService.updatebatchData(id, batch);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await batchService.deletebatchData(id);
  res.send(result);
});

module.exports = router;
