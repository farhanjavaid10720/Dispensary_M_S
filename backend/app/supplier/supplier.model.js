const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = mongoose.model(
  "supplier",
  new Schema({
    supplier_name: { type: String, required: true },
    contact_number: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
      validate: {
        validator: function (value) {
          // Regular expression for email validation
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          return emailRegex.test(value);
        },
        message: "Invalid email address",
      },
    },

    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { supplierSchema };
