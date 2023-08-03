const express = require('express');

const router = express.Router()

const gNbEvent = require('../controllers/gNbEvent.controller');
const gNbPerformanceRecord = require('../controllers/gNbPerformanceRecord.controller');

const tutorials = require('../controllers/tutorial.controller');

// gNbEvent
router.post('/api/gNbEvent', gNbEvent.create);
router.get('/api/gNbEvent', gNbEvent.findAll);
router.get('/api/gNbEvent/:cell_id', gNbEvent.findOne);
router.put('/api/gNbEvent', gNbEvent.update);
router.delete('/api/gNbEvent', gNbEvent.delete);


// gNbPerformanceRecord
router.post('/api/gNbPerformanceRecord', gNbPerformanceRecord.create);
router.get('/api/gNbPerformanceRecord/:record_type', gNbPerformanceRecord.findByRecordType);
router.put('/api/gNbPerformanceRecord', gNbPerformanceRecord.update);
router.delete('/api/gNbPerformanceRecord', gNbPerformanceRecord.delete);


router.post('/tutorials', tutorials.create);
router.delete('/tutorials', tutorials.delete);
router.put('/tutorials', tutorials.update);


module.exports = router;