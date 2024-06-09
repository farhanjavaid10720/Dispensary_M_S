const { GenerateDataResponse } = require("../../common/commons");
const { user } = require("./user.model");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
  return await user.find({});
};

const getUserByEmail = async (email) => {
  return await user.find({ email: email });
};
const getUserById = async (id) => {
  return await user.find({ _id: id });
};

const updateuserData = async (id, users, imagePath) => {
  try {
    let hashedPassword;
    if (users.password) {
      const salt = bcrypt.genSaltSync(10); // Increase the number of rounds for better security
      hashedPassword = bcrypt.hashSync(users.password, salt);
    }

    const updatedUserData = {
      ...users,
      password: hashedPassword || users.password, // Use the hashed password if available, otherwise use the original password
      image: imagePath,
    };
    let result = await user.findByIdAndUpdate(id, updatedUserData);
    return GenerateDataResponse("New user Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deleteuserData = async (id) => {
  try {
    let result = await user.findByIdAndDelete(id);
    return GenerateDataResponse("user is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateuserData,
  deleteuserData,
};
