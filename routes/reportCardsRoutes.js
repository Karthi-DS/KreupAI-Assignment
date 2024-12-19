const express = require('express');
const {generateReportCard, addReport} = require('../controllers/reportCardsController');

const router = express.Router();
router.get('/report-cards/:report_card_id', generateReportCard);
router.post("/add-report-card",addReport)

module.exports = router;
