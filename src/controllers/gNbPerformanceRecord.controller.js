const db = require("../models");
const gNbPerformanceRecord = db.gNbPerformanceRecord;

// Create and Save a new gNbPerformanceRecord
exports.create = (req, res) => {
    // Creating a gNbPerformanceRecord
    const gnb_performance_record = {
        record_type: req.body.record_type,
        value: req.body.value,
        cell_id: req.body.cell_id,
        createdAt: req.body.createdAt,
    };
    console.log(gnb_performance_record);

    if (!gnb_performance_record.record_type || !gnb_performance_record.cell_id) {
        res.status(400).send({
            message: "cell_id, record_type can not be null!"
        })
    } else {
        // Saving the gnb_performance_record in the database
        gNbPerformanceRecord.create(gnb_performance_record).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                Message:
                    err.message || "Some errors will occur when creating a gNbPerformanceRecord"
            });
        });
    }
};

exports.findByRecordType = (req, res) => {
    const record_type = req.query.record_type;
    let condition = record_type ? {record_type: record_type} : null;
    gNbPerformanceRecord.findAll({where: condition}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "error"
        });
    });
};

// Update
exports.update = (req, res) => {
    gNbPerformanceRecord.update({
        record_type: req.body.record_type,
        value: req.body.value,
        cell_id: req.body.cell_id,
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
    gNbPerformanceRecord.destroy({
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
