const { GenerateDataResponse } = require("../../common/commons");
const { supplierSchema } = require("./supplier.model");

const getAllsuppliers = async () => {
  return await supplierSchema.find({});
};

const getsupplierById = async (id) => {
  return await supplierSchema.find({ _id: id });
};
const addNewsupplier = async (supplier) => {
  const lowercaseEmail = supplier.email.toLowerCase();
  const scan = new supplierSchema({
    supplier_name: supplier.supplier_name,
    contact_number: supplier.contact_number,
    email: lowercaseEmail,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New Supplier is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updatesupplierData = async (id, supplier) => {
  try {
    let result = await supplierSchema.findByIdAndUpdate(id, supplier);
    return GenerateDataResponse("Supplier Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deletesupplierData = async (id) => {
  try {
    let result = await supplierSchema.findByIdAndDelete(id);
    return GenerateDataResponse("Supplier Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllsuppliers,
  getsupplierById,
  addNewsupplier,
  updatesupplierData,
  deletesupplierData,
};
