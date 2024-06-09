const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = mongoose.model(
  "batch",
  new Schema({
    batch_id: {
      type: String,
      required: true,
    },
    supplier_name: {
      type: String,
      required: true,
    },
    medicine_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cost_price: {
      type: Number,
      required: true,
    },
    sell_price: {
      type: Number,
      required: true,
    },
    production_date: {
      type: String,
      required: true,
    },
    expire_date: {
      type: String,
      required: true,
    },

    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { batchSchema };
