const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");

/* Controller Endpoints */
const supplierService = require("./supplier.service");
router.get("/", (req, res) => {
  GenerateResponse(supplierService.getAllsuppliers(), res);
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(supplierService.getsupplierById(id), res);
});
router.post("/", async (req, res) => {
  const supplier = req.body;
  let result = await supplierService.addNewsupplier(supplier);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const supplier = req.body;
  const id = req.params.id;
  let result = await supplierService.updatesupplierData(id, supplier);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await supplierService.deletesupplierData(id);
  res.send(result);
});

module.exports = router;
