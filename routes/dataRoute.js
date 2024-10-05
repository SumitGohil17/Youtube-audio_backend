const express = require('express');
const router = express.Router();
const {data} = require('../controller/dataController')

router.get('/data' , data);

module.exports = router;