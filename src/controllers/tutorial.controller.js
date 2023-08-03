const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can be placed here!"
        })
    }
    // Creating a Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

// Saving the Tutorial in the database
    Tutorial.create(tutorial). then(data => {
        res.send(data);
    }) .catch(err => {
        res.status(500).send ({
            Message:
                err.message || "Some errors will occur when creating a tutorial"
    });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: '%${title}%'}}: null;

    Tutorial.findAll({where: condition}). then(data => {
        res.send(data);
    }) .catch (err => {
        res.status(500).send({
            message:
                err.message || "error"
    });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};