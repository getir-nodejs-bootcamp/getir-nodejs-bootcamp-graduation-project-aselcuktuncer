const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

//! database connection before tests
beforeEach((done) => {
  mongoose.connect(
    `mongodb+srv://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});
//! disconnect database after tests
afterEach((done) => {
  mongoose.connection.close(() => done());
});

describe("Test of the RESTFUL API:", () => {
  //! those 3 tests are correct ones
  test("Correct POST request - Case 1", async () => {
    const data = {
      startDate: "2015-01-26",
      endDate: "2018-02-02",
      minCount: 100,
      maxCount: 500,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(0);
    expect(response.body.msg).toBe("Success");
    expect(response.body.records[0].totalCount).toBe(310);
  });

  test("Correct POST request - Case 2", async () => {
    const data = {
      startDate: "2016-05-26",
      endDate: "2018-02-02",
      minCount: 200,
      maxCount: 750,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(0);
    expect(response.body.msg).toBe("Success");
    expect(response.body.records.length).toBe(6);
  });

  test("Correct POST request - Case 3", async () => {
    const data = {
      startDate: "2015-05-26",
      endDate: "2018-02-02",
      minCount: 1200,
      maxCount: 3000,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(0);
    expect(response.body.msg).toBe("Success");
    expect(response.body.records[3].key).toBe("ibfRLaFT");
  });

  //! GET request is not allowed
  test("GET request - Wrong HTTP Request", async () => {
    const response = await request(app).get("/records").send();

    expect(response.statusCode).toBe(404);
    expect(response.body.code).toBe(1);
    expect(response.body.msg).toBe("wrong endpoint or HTTP method");
    expect(response.body.records.lenght).toBe(undefined);
  });

  //! wrong endpoint test
  test("POST request to /random - Wrong Endpoint", async () => {
    const data = {
      startDate: "2015-01-26",
      endDate: "2018-02-02",
      minCount: 100,
      maxCount: 500,
    };
    const response = await request(app).get("/random").send(data);

    expect(response.statusCode).toBe(404);
    expect(response.body.code).toBe(1);
    expect(response.body.msg).toBe("wrong endpoint or HTTP method");
    expect(response.body.records.lenght).toBe(undefined);
  });

  //! if records can not fetched due to an error - such as database connection problem or payload fault
  test("Empty Record List", async () => {
    const data = {
      startDate: "2018-01-26",
      endDate: "2018-02-02",
      minCount: 100,
      maxCount: 500,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(500);
    expect(response.body.code).toBe(3);
    expect(response.body.msg).toBe("record list is empty");
    expect(response.body.records.lenght).toBe(undefined);
  });

  //! startDate is greater than endDate 
  test("Payload Error - startDate is greater than endDate  error", async () => {
    const data = {
      startDate: "2019-01-26",
      endDate: "2018-02-02",
      minCount: 100,
      maxCount: 500,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(2);
    expect(response.body.msg).toBe(`\"endDate\" must be greater than \"ref:startDate\"`);
    expect(response.body.records.lenght).toBe(undefined);
  });

   //! minCount is greater than maxCount 
   test("Payload Error - minCount is greater than maxCount  error", async () => {
    const data = {
      startDate: "2015-01-26",
      endDate: "2018-02-02",
      minCount: 750,
      maxCount: 500,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(2);
    expect(response.body.msg).toBe(`\"maxCount\" must be greater than ref:minCount`);
    expect(response.body.records.lenght).toBe(undefined);
  });

  //! following 4 tests are incorrect payload tests
  test("Incorrect POST body - maxCount is missing", async () => {
    const data = {
      startDate: "2018-01-26",
      endDate: "2018-02-02",
      minCount: 100,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(2);
    expect(response.body.msg).toBe(`\"maxCount\" is required`);
    expect(response.body.records.lenght).toBe(undefined);
  });

  test("Incorrect POST body - startDate is missing", async () => {
    const data = {
      endDate: "2018-02-02",
      minCount: 100,
      maxCount: 500,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(2);
    expect(response.body.msg).toBe(`\"startDate\" is required`);
    expect(response.body.records.lenght).toBe(undefined);
  });

  test("Incorrect type of payload - startDate", async () => {
    const data = {
      startDate: 33,
      endDate: "2018-02-02",
      minCount: 100,
      maxCount: 800,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(2);
    expect(response.body.msg).toBe(`\"startDate\" must be a valid date`);
    expect(response.body.records.lenght).toBe(undefined);
  });

  test("Incorrect type of payload - minCount", async () => {
    const data = {
      startDate: "2017-01-26",
      endDate: "2018-02-02",
      minCount: "Hello",
      maxCount: 800,
    };
    const response = await request(app).post("/records").send(data);

    expect(response.statusCode).toBe(400);
    expect(response.body.code).toBe(2);
    expect(response.body.msg).toBe(`\"minCount\" must be a number`);
    expect(response.body.records.lenght).toBe(undefined);
  });
});
