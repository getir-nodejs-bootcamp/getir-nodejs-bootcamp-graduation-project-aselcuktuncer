const Joi = require("joi");

//! request payload's validation
const getAllRecords = Joi.object({
  startDate: Joi.date().iso().required().min(8),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required().min(8),
  minCount: Joi.number().min(0).required(),
  maxCount: Joi.number().greater(Joi.ref("minCount")).required().min(0),
});

module.exports = {
  getAllRecords,
};
