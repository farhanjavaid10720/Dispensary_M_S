const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = mongoose.model(
  "category",
  new Schema({
    category_name: { type: String, required: true },

    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { categorySchema };
