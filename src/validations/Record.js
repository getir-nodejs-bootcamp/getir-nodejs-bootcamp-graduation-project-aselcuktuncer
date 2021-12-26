const Joi = require("joi");

//! request payload's validation
const getAllRecords = Joi.object({
  startDate: Joi.string().required().min(8),
  endDate: Joi.string().required().min(8),
  minCount: Joi.number().min(0).required(),
  maxCount: Joi.number().min(0).required(),
});

module.exports = {
  getAllRecords,
};
