const express = require("express");
var router = express.Router();
const { body, param, validationResult } = require("express-validator");
const { ValidateInput, GenerateResponse } = require("../../common/commons");

/* Controller Endpoints */
const salesService = require("./sales.service");
router.get("/", (req, res) => {
  GenerateResponse(salesService.getAllsaless(), res);
});
router.get("/last-invoice", (req, res) => {
  salesService
    .getLastInvoiceNumber()
    .then((lastInvoiceNumber) => {
      if (lastInvoiceNumber !== null) {
        res.send(lastInvoiceNumber);
      } else {
        res.send("No invoices found.");
      }
    })
    .catch((error) => {
      // Handle any errors here
      res.status(500).send("An error occurred.");
    });
});
router.get("/last-date", (req, res) => {
  salesService
    .getLastDate()
    .then((lastDate) => {
      if (lastDate !== null) {
        res.send(lastDate);
      } else {
        res.send("No invoices found.");
      }
    })
    .catch((error) => {
      // Handle any errors here
      res.status(500).send("An error occurred.");
    });
});

router.get("/:id", param("id"), (req, res) => {
  const err = ValidateInput(validationResult(req), res);
  if (err) return;
  const id = req.params.id;
  GenerateResponse(salesService.getsalesById(id), res);
});
router.post("/", async (req, res) => {
  const sales = req.body;
  let result = await salesService.addNewsales(sales);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  const sales = req.body;
  const id = req.params.id;
  let result = await salesService.updatesalesData(id, sales);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let result = await salesService.deletesalesData(id);
  res.send(result);
});

module.exports = router;
