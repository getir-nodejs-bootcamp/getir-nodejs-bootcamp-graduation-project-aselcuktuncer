# Getir Case Study Challenge Documentation

This is a bare-bones of a application providing a REST API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format.

In this project an application is created using Express framework. Application is only handle POST requests. After the POST request with appropriate request payload it fetches the data in the provided MongoDB collection and return the results in the requested format. Also Mongoose is used as ODM library. Unit tests are made by Jest.

VS Code is used as IDE, Postman is used for API testing and MongoDB Compass is used for MongoDB GUI.

Base URL : https://getir-case-study-aselcuktuncer.herokuapp.com/records

Swagger Documentation: https://app.swaggerhub.com/apis-docs/aselcuktuncer/getir-case-study/1.0.0

The entire application is contained within the `src` folder.

`__test__` runs tests.

`config` enables us to utilize enviroment variables

`controllers` serves as middlewares for API requests

`loaders` is related to database connection

`middlewares` is used as helper documents such as error handler or validation function

`models` contains model - record -

`routes` contains routes which is only a POST method to /records

`servies` carry out database operations

`validations` ensure us to send appropriate request payload

`app.js` contains express app

`server.js` runs the app.listen() method.

## Request Using Endpoint URL

    https://getir-case-study-aselcuktuncer.herokuapp.com/records

## Git Clone Repository

    $ git clone https://github.com/getir-nodejs-bootcamp/getir-nodejs-bootcamp-graduation-project-aselcuktuncer

## Install NPM Packages

    npm i

## Start App

    npm start

## Run Tests

    npm test

# REST API

The REST API to the example app is described below.

## Get records based on count and dates

### Request Payload

`POST /records`

    {
        "startDate": "2017-01-12",
        "endDate": "2018-02-15",
        "minCount": 100,
        "maxCount": 300
    }

### Response

    Status: 200 OK
    {
        "code": 0,
        "msg": "success",
        "records": [
            {
                "key": "TAKwGc6Jr4i8Z487",
                "createdAt": "2017-01-28T01:22:14.398Z",
                "totalCount": 170
            },
            {
                "key": "TAKwGc6Jr4i8Z487",
                "createdAt": "2017-01-28T01:22:14.398Z",
                "totalCount": 120
            }
        ]
    }

## Errors and Error Types

| Code | Description |
| --- | --- |
| `0` | Success operation |
| `1` | Request sent to the wrong endpoint or incorrect HTTP method |
| `2` | Request payload is incorrect - such as minCount is missing |
| `3` | Empty record list - might be the database connection error |


