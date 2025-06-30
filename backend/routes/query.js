const express = require('express');
const router = express.Router();

const { createQuery, deleteQuery } = require('../controllers/queryController'); // ✅ Correct path

router.post('/createQuery', createQuery);
router.delete('/deleteQuery', deleteQuery);

module.exports = router;
