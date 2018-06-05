const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Connection = require('../models/Connection');
const Message = require('../models/Message');
const Notification = require('../models/Notification');

router.get('/', (req, res) => {
	res.send('Hello API');
});
router.post('/new', (req, res) => {});
module.exports = router;
