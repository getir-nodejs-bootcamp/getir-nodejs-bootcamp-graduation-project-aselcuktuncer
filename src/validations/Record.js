const Joi = require("joi");

//! request payload's validation
const getAllRecords = Joi.object({
  startDate: Joi.string().required().min(8),
  endDate: Joi.string().required().min(8),
  minCount: Joi.number().positive().required(),
  maxCount: Joi.number().positive().required(),
});

module.exports = {
  getAllRecords,
};
