const { GenerateDataResponse } = require("../../common/commons");
const { batchSchema } = require("./batch.model");

const getAllbatchs = async () => {
  return await batchSchema.find({});
};

const getbatchById = async (id) => {
  return await batchSchema.find({ _id: id });
};
const addNewbatch = async (batch) => {
  const scan = new batchSchema({
    batch_id: batch.batch_id,
    supplier_name: batch.supplier_name,
    medicine_name: batch.medicine_name,
    quantity: batch.quantity,
    cost_price: batch.cost_price,
    sell_price: batch.sell_price,
    production_date: batch.production_date,
    expire_date: batch.expire_date,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New batch is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updatebatchData = async (id, batch) => {
  try {
    let result = await batchSchema.findByIdAndUpdate(id, batch);
    return GenerateDataResponse("batch Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deletebatchData = async (id) => {
  try {
    let result = await batchSchema.findByIdAndDelete(id);
    return GenerateDataResponse("batch Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllbatchs,
  getbatchById,
  addNewbatch,
  updatebatchData,
  deletebatchData,
};
