// server.js
const express = require("express");
const server = express();
const moment = require("moment");
const body_parser = require("body-parser");

// parse JSON (application/json content-type)
server.use(body_parser.json());

const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "data";
const collectionName = "logs";

// << db init >>
db.initialize(dbName, collectionName, function (dbCollection) { // successCallback

    // << db CRUD routes >>
    server.post("/logs", (request, response) => {
        const item = request.body;
        dbCollection.insertOne({
            ...item,
            date: moment.utc().startOf("day"),
            dateTime: moment.utc(),
        }, (error, result) => { // callback of insertOne
            if (error) throw error;
            // return updated list
            dbCollection.find().toArray((_error, _result) => { // callback of find
                if (_error) throw _error;
                response.json(_result);
            });
        });
    });

    server.get("/logs/:eca", (request, response) => {
        dbCollection.find({
            entityContractAddress: request.params.eca
        }).toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    server.get("/logs/:eca/passport/:passport", (request, response) => {
        dbCollection.find({
            ethPassportAddress: request.params.passport,
            entityContractAddress: request.params.eca
        }).toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

}, function (err) { // failureCallback
    throw (err);
});


server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});