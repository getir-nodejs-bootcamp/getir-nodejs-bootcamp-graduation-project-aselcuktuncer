const Moongose = require("mongoose");

const db = Moongose.connection;

db.once("open", () => {
  console.log("Database is connected..");
});
//! database connection
const connectDB = async () => {
  const { DB_HOST, DB_PORT, DB_NAME } = process.env;
  await Moongose.connect(`mongodb+srv://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const disconnectDB = async (done) => {
  Moongose.connection.close(() => done());
};

module.exports = {
  connectDB,
  disconnectDB,
};
