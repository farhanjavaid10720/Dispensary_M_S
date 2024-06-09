const { GenerateDataResponse } = require("../../common/commons");
const { genericNameSchema } = require("./genericName.model");

const getAllgenericNames = async () => {
  return await genericNameSchema.find({});
};

const getgenericNameById = async (id) => {
  return await genericNameSchema.find({ _id: id });
};
const addNewgenericName = async (genericName) => {
  const scan = new genericNameSchema({
    generic_name: genericName.generic_name,
    description: genericName.description,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New Generic Name is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updategenericNameData = async (id, genericName) => {
  try {
    let result = await genericNameSchema.findByIdAndUpdate(id, genericName);
    return GenerateDataResponse("Generic Name Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deletegenericNameData = async (id) => {
  try {
    let result = await genericNameSchema.findByIdAndDelete(id);
    return GenerateDataResponse("Generic Name Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllgenericNames,
  getgenericNameById,
  addNewgenericName,
  updategenericNameData,
  deletegenericNameData,
};
