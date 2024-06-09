/* Node Modules*/

const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");
const jwt = require("jsonwebtoken");
const { uploads } = require("../../common/Upload.settings");
const path = require("path");

/* Controller Endpoints */
const userService = require("./user.service");
router.get("/", (req, res) => {
  GenerateResponse(userService.getAllUsers(), res);
});
router.get(
  "/getUserByEmail",
  body("email").isEmail().trim().toLowerCase(),
  (req, res) => {
    const err = ValidateInput(validationResult(req), res);
    if (err) return;
    // This code will be executed if email has a valid data
    const email = req.body.email;
    GenerateResponse(userService.getUserByEmail(email), res);
  }
);
router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(userService.getUserById(id), res);
});

router.put("/:id", uploads.single("image"), async (req, res) => {
  let user = req.body;
  user = JSON.parse(user["data"]);
  console.log("start");
  console.log(req.file);
  console.log("end");
  const id = req.params.id;
  let imagePath; // Initialize imagePath to null

  if (req.file) {
    // If req.file exists, set imagePath to the path of the uploaded image
    imagePath = path.join(`/uploads/`, req.file.filename);
  }
  let result = await userService.updateuserData(id, user, imagePath);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await userService.deleteuserData(id);
  res.send(result);
});
router.post("/me", async (req, res) => {
  const token = req.headers?.authorization;
  var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  GenerateResponse(decoded, res, "User Record");
  // GenerateResponse(userService.getUserById(id),res);
});

module.exports = router;
