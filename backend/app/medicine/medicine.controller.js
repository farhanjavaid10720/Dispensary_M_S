const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");

/* Controller Endpoints */
const medicineService = require("./medicine.service");
router.get("/", (req, res) => {
  GenerateResponse(medicineService.getAllmedicines(), res);
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(medicineService.getmedicineById(id), res);
});
router.post("/", async (req, res) => {
  const medicine = req.body;
  let result = await medicineService.addNewmedicine(medicine);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const medicine = req.body;
  const id = req.params.id;
  let result = await medicineService.updatemedicineData(id, medicine);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await medicineService.deletemedicineData(id);
  res.send(result);
});

module.exports = router;
