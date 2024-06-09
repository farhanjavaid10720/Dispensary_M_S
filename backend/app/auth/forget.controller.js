const express = require("express");
const {
  body,
  validationResult,
  check,
  checkBody,
} = require("express-validator");
const {
  ForgetPassword,
  FindUserByResetToken,
  UpdateUserPassword,
} = require("./auth.service");
const {
  ValidateInput,
  GenerateDataResponse,
  ValidateUploadType,
} = require("../../common/commons");
// const {uploads} = require("../../common/Upload.settings")
// const path  = require("path")
// const nodemailer = require("nodemailer");
const SendEmail = require("../../common/mail");
// const { env } = require('process');

var router = express.Router();

router.post("/", [body("email").isEmail()], async (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;

  email = req.body.email;
  let forget_resposne = await ForgetPassword(email);
  if ("token" in forget_resposne) {
    url = `${process.env["BASE_URL"]}:${process.env["BACKEND_PORT"]}/recover/${forget_resposne["token"]}`;
    SendEmail(
      { username: forget_resposne["username"], link: url, to: email },
      "forget"
    );
    return res.send(GenerateDataResponse("Recovery Email is sent to the user"));
  }
  return res.send(forget_resposne);
});

router.post("/validate", body("link").exists(), async (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  url = req.body.link;
  split_url = url.split("/");
  console.log(split_url);
  if (split_url.length != 5) {
    return res.send(GenerateDataResponse("Invalid Url Format", 1));
  }
  token = split_url[split_url.length - 1];
  token_res = await FindUserByResetToken(token);
  return res.send(token_res);
});

router.post(
  "/update",
  [body("link").exists(), body("link").isLength(5)],
  async (req, res) => {
    const err = ValidateInput(validationResult(req), res);
    if (err) return;
    url = req.body.link;
    password = req.body.password;
    split_url = url.split("/");
    if (split_url.length != 5) {
      return res.send(GenerateDataResponse("Invalid Url Format", 1));
    }
    token = split_url[split_url.length - 1];
    token_res = await FindUserByResetToken(token);
    if (token_res["error"] == 0) {
      return res.send(await UpdateUserPassword(password, token));
    } else {
      return res.send(token_res);
    }
  }
);

module.exports = router;
