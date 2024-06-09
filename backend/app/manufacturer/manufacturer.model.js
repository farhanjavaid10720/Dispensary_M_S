const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manufacturerSchema = mongoose.model(
  "manufacturer",
  new Schema({
    manufacturer_name: {
      type: String,
      required: true,
    },

    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { manufacturerSchema };
