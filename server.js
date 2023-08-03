require('dotenv').config()

const apiRoutes = require('./src/routes/APIRoutes');
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
    origin: "http://64.176.45.205:8081"
};


app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// simple route
app.get("/", (req, res) => {
    res.json({message: "backend index."});
});

app.use('/api', apiRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});