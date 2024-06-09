const { GenerateDataResponse } = require("../../common/commons");
const { medicineSchema } = require("../medicine/medicine.model");
const { user } = require("../user/user.model");
const { salesSchema } = require("../sales/sales.model");

const getAdminStats = async () => {
  const product_count = await medicineSchema.countDocuments();
  const user_count = await user.countDocuments();
  const order_count = await salesSchema.countDocuments();

  return {
    product_count: product_count,
    user_count: user_count,
    order_count: order_count,
  };
};

const getProductByCategory = async () => {
  const product_by_category = medicineSchema.aggregate([
    {
      $group: { _id: "$category", count: { $sum: 1 } },
    },
  ]);
  return product_by_category;
};

module.exports = { getAdminStats, getProductByCategory };
