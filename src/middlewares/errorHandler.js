//! error handler is used for wrong requests
module.exports = (error, req, res, next) => {
  res.status(error.status || 500);
  const records = [];
  res.json({
    code: 1,
    msg: "wrong endpoint or HTTP method",
    records,
  });
};
