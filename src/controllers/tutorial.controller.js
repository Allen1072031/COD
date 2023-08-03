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
    Tutorial.create(tutorial).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            Message:
                err.message || "Some errors will occur when creating a tutorial"
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? {title: {[Op.like]: '%${title}%'}} : null;

    Tutorial.findAll({where: condition}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "error"
        });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 'Error while retrieving tutorial with id=' + id,
            error: err
        });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    Tutorial.update({
        description: req.body.description
    }, {
        where: {
            title: req.body.title
        }
    }).then((result) => {
        console.log(result)
        if (result[0] > 0) {
            res.status(200).send({message: 'data found'});
        } else {
            return res.status(422).send({message: 'no data found'});
        }
    }).catch((err => {
        res.status(500).send({
            message: "error"
        });
        console.log(err)
    }));
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const title = req.body.title;
    Tutorial.destroy({
        where: {title: title ?? ''}
    }).then((count) => {
        if (!count) {
            return res.status(404).send({error: 'not found'});
        }
        res.status(204).send();
    }).catch((err => {
        res.status(500).send({
            message: "error"
        });
        console.log(err)
    }));
}
