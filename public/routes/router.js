const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../index.html'));
});
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../static/css/main.91b7dbed.css'));
});
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../static/js/main.69a88e7d.js'));
});

module.exports = router;
