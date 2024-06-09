const { GenerateDataResponse } = require("../../common/commons");
const { medicineSchema } = require("./medicine.model");

const getAllmedicines = async () => {
  return await medicineSchema.find({});
};

const getmedicineById = async (id) => {
  return await medicineSchema.find({ _id: id });
};
const addNewmedicine = async (medicine) => {
  const scan = new medicineSchema({
    medicine_name: medicine.medicine_name,
    category: medicine.category,
    generic_name: medicine.generic_name,
    manufacturer_name: medicine.manufacturer_name,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New Medicine is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updatemedicineData = async (id, medicine) => {
  try {
    let result = await medicineSchema.findByIdAndUpdate(id, medicine);
    return GenerateDataResponse("Medicine Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deletemedicineData = async (id) => {
  try {
    let result = await medicineSchema.findByIdAndDelete(id);
    return GenerateDataResponse("Medicine Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllmedicines,
  getmedicineById,
  addNewmedicine,
  updatemedicineData,
  deletemedicineData,
};
