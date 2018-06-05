const mongoose = require('mongoose');
const shortid = require('shortid');
const postTemplate = new mongoose.Schema(
	{
		_id: { type: String, default: shortid.generate },
		owner: { type: String, required: true },
		title: { type: String },
		content: { type: String, required: true },
		dateCreated: { type: Date, default: new Date() },
		likes: { type: Array, default: [] },
		comments: { type: Array, default: [] },
		type: { type: String, default: 'text' }
	},
	{ collection: 'posts' }
);
module.exports = mongoose.model('Post', postTemplate);
