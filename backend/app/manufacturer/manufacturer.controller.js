const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");

/* Controller Endpoints */
const manufacturerService = require("./manufacturer.service");
router.get("/", (req, res) => {
  GenerateResponse(manufacturerService.getAllmanufacturers(), res);
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(manufacturerService.getmanufacturerById(id), res);
});
router.post("/", async (req, res) => {
  const manufacturer = req.body;
  let result = await manufacturerService.addNewmanufacturer(manufacturer);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const manufacturer = req.body;
  const id = req.params.id;
  let result = await manufacturerService.updatemanufacturerData(
    id,
    manufacturer
  );
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await manufacturerService.deletemanufacturerData(id);
  res.send(result);
});

module.exports = router;
