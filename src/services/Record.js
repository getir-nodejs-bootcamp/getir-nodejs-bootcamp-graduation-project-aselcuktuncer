const Record = require("../models/Record");

//! list function fetches records filtering by  dates
const list = (start, end) => {
  return Record.find({ createdAt: { $gte: start, $lte: end } });
};

module.exports = {
  list,
};
