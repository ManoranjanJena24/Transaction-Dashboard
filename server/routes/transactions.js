const express = require('express');
const router = express.Router();
const {
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
} = require('../controllers/transactionsController');

// List transactions with search and pagination
router.get('/', listTransactions);

// Get statistics
router.get('/statistics', getStatistics);

// Get bar chart data
router.get('/bar-chart', getBarChart);

// Get pie chart data
// router.get('/pie-chart', getPieChart);

// Get combined data
router.get('/combined', getCombinedData);

module.exports = router;
