const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");

/* Controller Endpoints */
const categoryService = require("./category.service");
router.get("/", (req, res) => {
  GenerateResponse(categoryService.getAllcategorys(), res);
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(categoryService.getcategoryById(id), res);
});
router.post("/", async (req, res) => {
  const category = req.body;
  let result = await categoryService.addNewcategory(category);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const category = req.body;
  const id = req.params.id;
  let result = await categoryService.updatecategoryData(id, category);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await categoryService.deletecategoryData(id);
  res.send(result);
});

module.exports = router;
