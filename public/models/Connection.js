const mongoose = require('mongoose');
const shortid = require('shortid');
const connectionTemplate = new mongoose.Schema(
	{
		_id: { type: String, default: shortid.generate },
		user0: { type: String, required: true },
		user1: { type: String, required: true },
		token: { type: String, required: true },
		messages: { type: Array, default: [] },
		dateCreated: { type: Date, default: new Date() }
	},
	{ collection: 'connections' }
);
module.exports = mongoose.model('Connection', connectionTemplate);
