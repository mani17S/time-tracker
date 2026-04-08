const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timer.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, timerController.createTimer);
router.post('/:id/start', auth, timerController.startTimer);
router.post('/:id/pause', auth, timerController.pauseTimer);
router.get('/:id/total', auth, timerController.getTotalTime);
router.get('/:id/today', auth, timerController.getTodayTime);
router.get('/:id/weekly', auth, timerController.getWeeklyTime);

module.exports = router;