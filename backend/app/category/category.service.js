const { GenerateDataResponse } = require("../../common/commons");
const { categorySchema } = require("./category.model");

const getAllcategorys = async () => {
  return await categorySchema.find({});
};

const getcategoryById = async (id) => {
  return await categorySchema.find({ _id: id });
};
const addNewcategory = async (category) => {
  const scan = new categorySchema({
    category_name: category.category_name,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New Category is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updatecategoryData = async (id, category) => {
  try {
    let result = await categorySchema.findByIdAndUpdate(id, category);
    return GenerateDataResponse("Category Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deletecategoryData = async (id) => {
  try {
    let result = await categorySchema.findByIdAndDelete(id);
    return GenerateDataResponse("Category Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllcategorys,
  getcategoryById,
  addNewcategory,
  updatecategoryData,
  deletecategoryData,
};
