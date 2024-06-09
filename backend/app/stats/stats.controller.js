/* Node Modules*/

const express = require('express');
var router = express.Router();
const {body,param,validationResult} = require("express-validator")
const {ValidateInput,GenerateResponse} = require("../../common/commons");
const jwt = require('jsonwebtoken');

/* Controller Endpoints */
const statsServices = require("./stats.service");

router.get("/top",(req,res)=>{
    return GenerateResponse(statsServices.getAdminStats(),res);
})
router.get("/productCategory", async (req, res) => {
    return GenerateResponse(statsServices.getProductByCategory(),res);
})



module.exports = router;