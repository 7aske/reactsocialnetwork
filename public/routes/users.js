const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

///////////////////////
const jwt = require('jsonwebtoken');
const config = require('../config/config');
//////////////////////
User.update({}, { online: false }, { multi: true }, (err, raw) => {
	console.log('Users online: ' + raw.nModified);
});
router.get('/', (req, res) => {
	res.send('Hello Users');
});

//REGISTATION//////////////////////////////////////////
router.post('/register', (req, res) => {
	console.log(req.body);
	req.checkBody('firstName', 'First name is required.').notEmpty();
	req.checkBody('lastName', 'Last name is required.').notEmpty();
	req.checkBody('username', 'Username is required.').notEmpty();
	req.checkBody('email', 'E-mail is required.').notEmpty();
	req.checkBody('email', 'Email is invalid.').isEmail();
	req.checkBody('password', 'Password is required.').notEmpty();
	req.checkBody('confirm', 'Confirm your password.').notEmpty();
	req.checkBody('password', 'Passwords do not match.').equals(
		req.body.confirm
	);
	if (req.validationErrors()) {
		let errors = req.validationErrors().map(e => {
			return e.msg;
		});
		res.status(400).send({ errors: errors });
	} else {
		User.find({
			$or: [{ email: req.body.email }, { username: req.body.username }]
		})
			.exec()
			.then(user => {
				if (user.length === 0) {
					const newToken = jwt.sign({ id: user._id }, config.secret, {
						expiresIn: 86400 * 7 //Expires in a week
					});
					const newUser = new User({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						username: req.body.username,
						email: req.body.email,
						password: req.body.password,
						confirm: req.body.confirm,
						token: newToken
					});

					User.createUser(newUser, result => {
						console.log(result);
						res.status(201).send({ auth: true, token: newToken });
					});
				} else {
					res.status(400).send({ errors: ['User already exists.'] });
				}
			})
			.catch(err => console.log(err));
	}
});
//LOGIN//////////////////////////////////////////////////////
router.post('/login', (req, res) => {
	req.checkBody('username', 'Username is required.').notEmpty();
	req.checkBody('password', 'Password is required.').notEmpty();
	console.log(req.cookies);
	if (req.validationErrors()) {
		let errors = req.validationErrors().map(e => {
			return e.msg;
		});
		res.status(400).send({ errors: errors });
	} else {
		const username = req.body.username;
		const password = req.body.password;
		const token = req.cookies['x-access-token'];

		User.findOne({ $or: [{ email: username }, { username: username }] })
			.exec()
			.then(user => {
				let id = user._id;
				if (user) {
					if (User.comparePassword(password, user.password)) {
						let newToken = jwt.sign({ id: user }, config.secret, {
							expiresIn: 86400 * 7
						});
						User.findOneAndUpdate(
							{ _id: id },
							{
								$set: {
									online: true,
									token: newToken
								}
							}
						)
							.select({
								firstName: 1,
								lastName: 1,
								email: 1,
								username: 1
							})
							.exec()
							.then(result =>
								res.status(200).send({
									auth: true,
									token: newToken,
									user: result
								})
							)
							.catch(err => console.log(err));
					}
				} else {
					res.status(404).send({ errors: ['User not found.'] });
				}
			})
			.catch(err => console.log(err));
	}
});
router.get('/logout', (req, res) => {
	const token = req.cookies['x-access-token'];
	jwt.verify(token, config.secret, function(err, decoded) {
		User.findOneAndUpdate({ token: token }, { $set: { online: false } })
			.exec()
			.then(result => {
				if (result) {
					res.status(200).send({ success: 'success' });
				} else {
					res.status(403).send({ errors: ['Unauthorized.'] });
				}
			})
			.catch(err => console.log(err));
	});
});
module.exports = router;
