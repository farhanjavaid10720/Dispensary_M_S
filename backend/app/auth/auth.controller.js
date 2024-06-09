const express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { addNewuser, Login, Logout } = require("./auth.service");
const {
  ValidateInput,
  GenerateDataResponse,
  ValidateUploadType,
  GenerateResponse,
} = require("../../common/commons");
const { uploads } = require("../../common/Upload.settings");
const path = require("path");
const nodemailer = require("nodemailer");
const SendEmail = require("../../common/mail");
const jwt = require("jsonwebtoken");

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength(5)],
  async (req, res) => {
    const user = req.body;
    const err = ValidateInput(validationResult(req), res);
    console.log(user);
    if (err) return;
    await Login(user.email, user.password, res);
  }
);

router.post("/register", uploads.single("image"), async (req, res) => {
  if (!req.file) return res.send(GenerateDataResponse("invalid file", 1));
  try {
    var user = JSON.parse(req.body.data);
  } catch (err) {
    return res.send(GenerateDataResponse("Invalid data", true));
  }
  let result = await addNewuser(
    user,
    path.join(`/uploads/`, req.file.filename)
  );
  res.send(result);
});

router.post("/sendmail", async (req, res) => {
  const data = {
    to: "farhan.javaid17arid19@gmail.com",
    username: "Farhan Javaid",
  };
  SendEmail(data, "forget");
  return res.send({ send: 1 });
});

router.post("/me", async (req, res) => {
  const token = req.headers?.authorization;
  try {
    var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    GenerateResponse(decoded, res, "Token is Valid");
  } catch (ex) {
    res.send(GenerateDataResponse("Token Expired", 1), 401);
  }
});

module.exports = router;
