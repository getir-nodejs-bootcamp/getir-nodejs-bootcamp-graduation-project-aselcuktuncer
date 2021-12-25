const { connectDB, disconnectDB } = require("./mongodb");

module.exports = () => {
  connectDB();
};
