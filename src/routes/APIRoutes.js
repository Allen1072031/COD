const express = require('express');

const router = express.Router()

const Model = require('../models/mymodels');
const gNbEvent = require('../models/gNbEventModel');
const gNbPerformanceRecord = require('../models/gNbPerformanceRecordModel');

// gNbEvent
router.post('/gNbEvent/post', async (req, res) => {
    const data = new gNbEvent({
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        cell_id: req.body.cell_id,
        description: req.body.description,
        last_time: req.body.last_time,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.get('/gNbEvent/getAll', async (req, res) => {
    try{
        const data = await gNbEvent.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// gNbPerformanceRecord
router.post('/gNbPerformanceRecord/post', async (req, res) => {
    const data = new gNbPerformanceRecord({
        record_type: req.body.record_type,
        created_at: req.body.created_at,
        value: req.body.value,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.get('/gNbPerformanceRecord/:record_type', async (req, res) => {
    try{
        const query = { record_type: req.params.record_type};
        const data = await gNbPerformanceRecord.find(query);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;