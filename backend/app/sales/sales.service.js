const { GenerateDataResponse } = require("../../common/commons");
const { salesSchema } = require("./sales.model");

const getAllsaless = async () => {
  return await salesSchema.find({});
};

const getsalesById = async (id) => {
  return await salesSchema.find({ _id: id });
};
const addNewsales = async (sales) => {
  const date = new Date(sales.entry_date).toLocaleString().slice(0, 24);
  const scan = new salesSchema({
    invoice_number: sales.invoice_number,
    entry_date: date,
    total_amount: sales.total_amount,
    discount: sales.discount,
    discount_amount: sales.discount_amount,
    total_payable: sales.total_payable,
    paid: sales.paid,
    return_amount: sales.return_amount,
  });
  let result = {};
  try {
    let res = await scan.save();
    const responseData = {
      message: "New Sale is added",
      _id: res._id,
    };
    return GenerateDataResponse(responseData);
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const updatesalesData = async (id, sales) => {
  try {
    let result = await salesSchema.findByIdAndUpdate(id, sales);
    return GenerateDataResponse("Sale Record is updated");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};
const deletesalesData = async (id) => {
  try {
    let result = await salesSchema.findByIdAndDelete(id);
    return GenerateDataResponse("Sale Record is removed.");
  } catch (e) {
    return GenerateDataResponse(e["message"], true);
  }
};

// const getLastInvoiceNumber = async () => {
//   // try {
//   //   // const invoices = await salesSchema.find({}, "invoice_number"); // Only fetch the 'invoice_number' field
//   //   // const invoiceNumbers = invoices.map((invoice) => invoice.invoice_number);
//   //   // return invoiceNumbers;
//   //   const lastInvoice = await salesSchema.findOne({}, "invoice_number", {
//   //     sort: { invoice_number: -1 },
//   //   });
//   //   if (lastInvoice) {
//   //     return lastInvoice.invoice_number;
//   //   } else {
//   //     return null;
//   //   }
//   // } catch (e) {
//   //   return GenerateDataResponse(e["message"], true);
//   // }
//   try {
//     const lastInvoice = await salesSchema.findOne({}, "invoice_number", {
//       sort: { invoice_number: -1 },
//     });
//     if (lastInvoice) {
//       return lastInvoice.invoice_number;
//     } else {
//       return null;
//     }
//   } catch (e) {
//     return GenerateDataResponse(e["message"], true);
//   }
// };

const getLastInvoiceNumber = async () => {
  try {
    // Use Mongoose to find the last invoice
    const lastInvoice = await salesSchema
      .find({})
      .sort({ invoice_number: -1 })
      .limit(1)
      .exec(); // Use .exec() to execute the query and return a promise

    if (lastInvoice && lastInvoice.length > 0) {
      return lastInvoice[0].invoice_number;
    } else {
      return null;
    }
  } catch (e) {
    return GenerateDataResponse(e.message, true);
  }
};

// const getLastDate = async () => {
//   try {
//     const lastDate = await salesSchema.findOne({}, "entry_date", {
//       sort: { entry_date: -1 },
//     });
//     if (lastDate) {
//       return lastDate.entry_date;
//     } else {
//       return null;
//     }
//   } catch (e) {
//     return GenerateDataResponse(e["message"], true);
//   }
// };

const getLastDate = async () => {
  try {
    // Use Mongoose to find the last invoice
    const lastDate = await salesSchema
      .find({})
      .sort({ entry_date: -1 })
      .limit(1)
      .exec(); // Use .exec() to execute the query and return a promise

    if (lastDate && lastDate.length > 0) {
      return lastDate[0].entry_date;
    } else {
      return null;
    }
  } catch (e) {
    return GenerateDataResponse(e.message, true);
  }
};
module.exports = {
  getAllsaless,
  getsalesById,
  addNewsales,
  updatesalesData,
  deletesalesData,
  getLastInvoiceNumber,
  getLastDate,
};
