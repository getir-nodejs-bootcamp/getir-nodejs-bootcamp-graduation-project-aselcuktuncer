const express = require("express");
const { getResult } = require("../controllers/Record");
const schemas = require("../validations/Record");
const validate = require("../middlewares/validate");

const router = express.Router();
//! there is only one route. validation is made before request sent
router.route("/").post(validate(schemas.getAllRecords, "body"), getResult);

module.exports = router;
