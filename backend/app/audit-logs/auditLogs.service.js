const { GenerateDataResponse } = require("../../common/commons");
const { auditLogsSchema } = require("./auditLogs.model");

const getAllauditLogss = async () => {
  return await auditLogsSchema.find({});
};

const getauditLogsById = async (id) => {
  return await auditLogsSchema.find({ _id: id });
};
const addNewauditLogs = async (auditLogs) => {
  const scan = new auditLogsSchema({
    user_name: auditLogs.user_name,
    user_email: auditLogs.user_email,
    image: auditLogs.image,
    event: auditLogs.event,
    resource: auditLogs.resource,
    details: auditLogs.details,
    date: auditLogs.date,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New Log is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updateauditLogsData = async (id, auditLogs) => {
  try {
    let result = await auditLogsSchema.findByIdAndUpdate(id, auditLogs);
    return GenerateDataResponse("Log Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deleteauditLogsData = async (id) => {
  try {
    let result = await auditLogsSchema.findByIdAndDelete(id);
    return GenerateDataResponse("Log Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

module.exports = {
  getAllauditLogss,
  getauditLogsById,
  addNewauditLogs,
  updateauditLogsData,
  deleteauditLogsData,
};
