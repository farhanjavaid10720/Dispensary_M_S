const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genericNameSchema = mongoose.model(
  "genericName",
  new Schema({
    generic_name: { type: String, required: true },
    description: { type: String, required: true },

    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { genericNameSchema };
