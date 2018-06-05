const mongoose = require('mongoose');
const shortid = require('shortid');
const notificationTemplate = new mongoose.Schema({
	_id: { type: String, default: shortid.generate },
	index: { type: Number, default: 0, unique: true },
	content: { type: String, required: true },
	dateSent: { type: Date, default: new Date() }
});
module.exports = mongoose.model('Notification', notificationTemplate);
