require('dotenv').config()

const routes = require('./src/routes/APIRoutes');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./src/models");

db.sequelize.sync().then(() => {
    console.log('Table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

let corsOptions = {
    origin: "http://localhost:8081"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.use('/api', routes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});