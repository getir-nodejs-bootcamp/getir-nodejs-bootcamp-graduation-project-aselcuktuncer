const Mongoose = require("mongoose");

//! model is created based on database
const RecordSchema = new Mongoose.Schema(
  {
    key: String,
    createdAt: Date,
    counts: [],
    value: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("record", RecordSchema);
