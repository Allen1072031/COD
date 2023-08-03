const express = require('express');

const router = express.Router()

const gNbEvent = require('../controllers/gNbEvent.controller');
const gNbPerformanceRecord = require('../controllers/gNbPerformanceRecord.controller');

const tutorials = require('../controllers/tutorial.controller');

// gNbEvent
router.post('/gNbEvent', gNbEvent.create);
router.get('/gNbEvent/:offset?', gNbEvent.findAll);
router.get('/gNbEvent/:cell_id', gNbEvent.findOne);
router.put('/gNbEvent', gNbEvent.update);
router.delete('/gNbEvent', gNbEvent.delete);


// gNbPerformanceRecord
router.post('/gNbPerformanceRecord', gNbPerformanceRecord.create);
router.get('/gNbPerformanceRecord/:record_type', gNbPerformanceRecord.findByRecordType);
router.put('/gNbPerformanceRecord', gNbPerformanceRecord.update);
router.delete('/gNbPerformanceRecord', gNbPerformanceRecord.delete);


router.post('/tutorials', tutorials.create);
router.delete('/tutorials', tutorials.delete);
router.put('/tutorials', tutorials.update);


module.exports = router;