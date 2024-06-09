const { user } = require("../user/user.model");
const bcrypt = require("bcrypt");
const {
  GenerateDataResponse,
  validatePassword,
  GenerateResponse,
} = require("../../common/commons");
const { SetSession } = require("./auth.middleware");
const SendEmail = require("../../common/mail");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Login = async (email, password, res) => {
  let obj = (await user.findOne({ email: email }))?.toJSON();
  if (obj == undefined) {
    return res
      .status(401)
      .send(GenerateDataResponse("Invalid email or password", true));
  } else {
    const verifyPassword = bcrypt.compareSync(password, obj["password"]);
    if (verifyPassword) {
      delete obj.password;
      const token = SetSession(obj);
      let userData = jwt.verify(token, process.env.PRIVATE_KEY);
      const response = {
        userData: userData,
        token: token,
        // role: obj.role, // Include the role attribute in the response
      };

      console.log("res", response);
      return GenerateResponse(response, res, "User Logged In");
    } else {
      return res
        .status(401)
        .send(GenerateDataResponse("Invalid email or password", true));
    }
  }
};

const addNewuser = async (obj, imagepath) => {
  // Validate the password
  if (!validatePassword(obj.password)) {
    return GenerateDataResponse(
      "Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and should not contain spaces.",
      true
    );
  }

  try {
    // Hash the password using bcrypt
    const salt = bcrypt.genSaltSync(1);
    const hashedPassword = bcrypt.hashSync(obj.password, salt);
    const lowercaseEmail = obj.email.toLowerCase();

    const newUser = new user({
      id: obj.id,
      image: imagepath,
      name: obj.name,
      type: obj.type,
      age: obj.age,
      email: lowercaseEmail,
      password: hashedPassword,
    });

    let result = await newUser.save();
    SendEmail({ username: obj.name, to: obj.email }, "registration");
    return GenerateDataResponse("New user added");
  } catch (error) {
    return GenerateDataResponse(error.message, true);
  }
};
const GenerateResetToken = (expire_mins = 60) => {
  let token = crypto.randomBytes(20).toString("hex");
  let expire_time = new Date(
    new Date().getTime() + expire_mins * 60000
  ).toUTCString();
  let generated_time = new Date().toUTCString();
  return {
    token: token,
    expire_at: expire_time,
    generated_at: generated_time,
  };
};
const VerifyTokenExpiry = (expire_time, generated_time) => {
  return new Date(expire_time).getHours() - new Date(generated_time).getHours();
};
const ForgetPassword = async (email) => {
  let user_data = await user.findOne({ email: email });
  if (user_data == null) {
    return GenerateDataResponse("Invalid email address", true);
  }
  let token = GenerateResetToken();
  let res = await user.updateOne({ email: email }, { reset_password: token });
  return { ...token, username: user_data["name"] };
};
const FindUserByResetToken = async (token) => {
  let data = await user.findOne({}).where({ "reset_password.token": token });
  if (data == null) return GenerateDataResponse("Invalid Url", 1);
  if (data != null) {
    let reset_obj = data["reset_password"];
    if (
      VerifyTokenExpiry(reset_obj["expire_at"], reset_obj["generated_at"]) < 0
    ) {
      return GenerateDataResponse("Invalid Url", 1);
    }
  }
  return GenerateDataResponse("Url is valid", 0);
};
const UpdateUserPassword = async (password, token) => {
  if (!validatePassword(password)) {
    return GenerateDataResponse(
      "Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and should not contain spaces.",
      true
    );
  }
  const salt = bcrypt.genSaltSync(1);
  const password_hash = bcrypt.hashSync(password, salt);
  let data = await user.findOne({}).where({ "reset_password.token": token });
  let res = await data.updateOne({ password: password_hash });
  return GenerateDataResponse("Password Updated");
};

module.exports = {
  Login,
  addNewuser,
  ForgetPassword,
  FindUserByResetToken,
  UpdateUserPassword,
};
