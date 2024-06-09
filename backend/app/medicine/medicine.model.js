const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = mongoose.model(
  "medicine",
  new Schema({
    medicine_name: { type: String, required: true },
    category: { type: String, required: true },
    generic_name: { type: String, required: true },
    manufacturer_name: { type: String, required: true },

    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { medicineSchema };
