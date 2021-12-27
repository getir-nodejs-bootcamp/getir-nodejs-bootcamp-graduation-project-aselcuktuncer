const app = require("./app");
//! app is exported and then listen method is used in server.js in order to ease test made by jest and supertest
app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on ${process.env.PORT || 3000}...`);
});
