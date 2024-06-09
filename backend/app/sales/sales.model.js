// Customer Display:

// Name: Name or label of the display.
// Type: Type or model of the display (e.g., LCD, LED).
// Screen Size: Size of the display screen.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salesSchema = mongoose.model(
  "sales",
  new Schema({
    invoice_number: { type: String, required: true },
    entry_date: {
      type: String,
      default: new Date().toLocaleString().slice(0, 24),
    },
    total_amount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      // required: true,
    },
    discount_amount: {
      type: Number,
      required: true,
    },
    total_payable: {
      type: Number,
      required: true,
    },
    paid: {
      type: Number,
      required: true,
    },
    return_amount: {
      type: Number,
      required: true,
    },
    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { salesSchema };
