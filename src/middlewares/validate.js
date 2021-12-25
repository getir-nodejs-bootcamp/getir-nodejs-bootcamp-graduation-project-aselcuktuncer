const httpStatus = require("http-status");

const validate = (schema, source) => (req, res, next) => {
  //! exploited from gokhan hoca's validate function
  const { value, error } = schema.validate(req[source]);

  if (error) {
    const errorMessage = error?.details
      ?.map((detail) => detail?.message)
      .join(", ");
    const records = [];
    const responsePayload = {
      code: 2,
      msg: errorMessage,
      records,
    };
    return res.status(httpStatus.BAD_REQUEST).send(responsePayload);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
