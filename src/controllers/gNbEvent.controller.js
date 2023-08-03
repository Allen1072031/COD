const db = require("../models");
const gNbEvent = db.gNbEvent;

// Create and Save a new gNbEvent
exports.create = (req, res) => {
    // Creating a Tutorial
    const gnb_event = {
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        cell_id: req.body.cell_id,
        description: req.body.description,
        last_time: req.body.last_time,
    };

    if (!gnb_event.cell_id || !gnb_event.start_time || !gnb_event.description) {
        res.status(400).send({
            message: "start_time, cell_id, description can not be null!"
        })
    } else {
        // Saving the gnb_event in the database
        gNbEvent.create(gnb_event).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some errors will occur when creating a gNbEvent"
            });
        });
    }
};

exports.findAll = (req, res) => {
    let data_offset = req.params.offset
    if(!data_offset) {
        data_offset = 0
    }else{
        data_offset = parseInt(data_offset)
    }
    gNbEvent.findAll({limit: 10, offset: data_offset}).then(data => {
        // console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error"
        });
    });
};

// Find specify events with a cell_id
exports.findOne = (req, res) => {
    const cell_id = req.query.cell_id;
    let condition = cell_id ? {cell_id: cell_id} : null;

    gNbEvent.findAll({where: condition}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error"
        });
    });
};

// Update
exports.update = (req, res) => {
    gNbEvent.update({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        cell_id: req.body.cell_id,
        description: req.body.description,
        last_time: req.body.last_time,
    }, {
        where: {
            id: req.body.id
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

// Delete
exports.delete = (req, res) => {
    const id = req.body.id;
    gNbEvent.destroy({
        where: {id: id ?? null}
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
