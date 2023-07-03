const express = require('express');
const serverConfig = require('./configs/server.config');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./configs/db.config');
const userModel = require('./Models/user.model');
app.listen(serverConfig.PORT, () => { console.log(`server started at ${serverConfig.PORT}`); });
/**
 * Logic to connect to MongoDB and create an admin user
 * need to have mongodb up and running in your local machine
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to DB");
});

db.once("open", () => {
    console.log("DB is connected");
    init();
});

async function init() {
    /**
     * initialize the mongo db
     * need to create the admin user
      */
    const admin = await userModel.create({ name: "Prince patel", userId: "admin", email: "princewritecode@gmail.com", userType: "ADMIN", password: "Welcome1" }); //it returns promise
    console.log(admin);
}