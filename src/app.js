const express = require("express");
const res = require("express/lib/response");
const config = require("./config");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/errorHandler");
const { RecordRoutes } = require("./routes");

//! dotenv and database utilities
config();
loaders();

const app = express();

app.use(express.json());

app.use("/records", RecordRoutes);
//! if request is not met, sent to the error handler
app.use((req, res, next) => {
  const error = new Error("There is no endpoint like this...");
  error.status = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;
