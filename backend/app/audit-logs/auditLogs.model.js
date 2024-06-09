const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auditLogsSchema = mongoose.model(
  "auditLogs",
  new Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    image: { type: String, default: "/uploads/default.svg", require: false },
    event: { type: String, required: true },
    resource: { type: String, required: true },
    details: { type: String, required: false, default: null },
    date: { type: String, required: true },
    created_at: { type: Date, default: new Date().toUTCString() },
    updated_at: { type: Date, default: new Date().toUTCString() },
  })
);

module.exports = { auditLogsSchema };
