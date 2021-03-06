const mongoose = require('mongoose');
const shortid = require('shortid');
const config = require('../config/config');
const crypto = require('crypto');
const userTemplate = new mongoose.Schema(
	{
		_id: { type: String, default: shortid.generate },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		dateCreated: { type: Date, default: new Date() },
		online: { type: Boolean, default: false },
		lastLogin: { type: Date, default: new Date() },
		token: { type: String, default: '' },
		posts: { type: Array, default: [] },
		connections: { type: Array, default: [] },
		notifications: { type: Array, default: [] }
	},
	{
		collection: 'users'
	}
);
userTemplate.index({ firstName: 'text', lastName: 'text' });

module.exports = mongoose.model('User', userTemplate);
module.exports.createUser = (newUser, callback) => {
	const secret = config.hashSecret;
	const hash = crypto
		.createHmac('sha256', secret)
		.update(newUser.password)
		.digest('hex');
	newUser.password = hash;
	newUser
		.save()
		.then(result => callback(result))
		.catch(err => console.log(err));
};
module.exports.comparePassword = (loginPassword, databasePassword) => {
	const secret = config.hashSecret;
	const hash = crypto
		.createHmac('sha256', secret)
		.update(loginPassword)
		.digest('hex');
	return hash == databasePassword;
};
