const { GenerateDataResponse } = require("../../common/commons");
const { manufacturerSchema } = require("./manufacturer.model");

const getAllmanufacturers = async () => {
  return await manufacturerSchema.find({});
};

const getmanufacturerById = async (id) => {
  return await manufacturerSchema.find({ _id: id });
};
const addNewmanufacturer = async (manufacturer) => {
  const scan = new manufacturerSchema({
    manufacturer_name: manufacturer.manufacturer_name,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New manufacturer is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updatemanufacturerData = async (id, manufacturer) => {
  try {
    let result = await manufacturerSchema.findByIdAndUpdate(id, manufacturer);
    return GenerateDataResponse("manufacturer Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deletemanufacturerData = async (id) => {
  try {
    let result = await manufacturerSchema.findByIdAndDelete(id);
    return GenerateDataResponse("manufacturer Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllmanufacturers,
  getmanufacturerById,
  addNewmanufacturer,
  updatemanufacturerData,
  deletemanufacturerData,
};
