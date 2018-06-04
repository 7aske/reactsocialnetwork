const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

User.find({})
	.update({ $set: { online: false } })
	.exec()
	.then(result => console.log(result.nModified))
	.catch(err => console.log(err));

router.get('/', (req, res) => {
	res.send('Hello Users');
});
router.post('/register', (req, res) => {
	console.log(req.body);
	req.checkBody('firstName', 'First name is required.').notEmpty();
	req.checkBody('lastName', 'Last name is required.').notEmpty();
	req.checkBody('username', 'Username is required.').notEmpty();
	req.checkBody('email', 'E-mail is required.').notEmpty();
	req.checkBody('email', 'Email is invalid.').isEmail();
	req.checkBody('password', 'Password is required.').notEmpty();
	req.checkBody('confirm', 'Confirm your password.').notEmpty();
	req
		.checkBody('password', 'Passwords do not match.')
		.equals(req.body.confirm);

	let errors = req.validationErrors();
	if (errors) {
		let message = errors.map(e => {
			return e.msg;
		});
		res.status(400).send(message);
	} else {
		User.find({
			$or: [{ email: req.body.email }, { username: req.body.username }]
		})
			.exec()
			.then(result => {
				if (result.length === 0) {
					const newUser = new User({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						username: req.body.username,
						email: req.body.email,
						password: req.body.password,
						confirm: req.body.confirm
					});
					User.createUser(newUser, result => {
						console.log(result);
						res.send({
							message: 'Success'
						});
					});
				} else {
					console.log('User already exists');
				}
			})
			.catch(err => console.log(err));
	}
});
passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ $or: [{ username: username }, { email: username }] })
			.exec()
			.then(result => {
				if (!result) {
					return done(null, false);
				} else {
					if (User.comparePassword(password, result.password)) {
						User.findOneAndUpdate(
							{ username: result.username },
							{
								$set: {
									lastLogin: new Date(),
									online: true
								}
							}
						)
							.exec()
							.then(result => console.log(result))
							.catch(err => console.log(err));
						return done(null, result);
					} else {
						return done(null, false);
					}
				}
			})
			.catch(err => console.log(err));
	})
);
passport.serializeUser((user, done) => {
	console.log(user.id);
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	console.log(id);
	User.findById(id, (err, user) => {
		done(err, user);
	});
});
router.post('/login', (req, res) => {
	console.log(req.body);
	passport.authenticate('local', (err, user) => {
		if (err) return res.status(400).send({ message: err });
		if (!user) return res.status(401).send({ message: 'Unautohorized' });
		req.logIn(user, err => {
			if (err) return res.status(400).send({ message: err });
			return res.status(200).send({ message: user.username });
		});
	})(req, res);
});
router.get('/logout', (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { $set: { online: false } })
		.exec()
		.then(result => {
			req.logout();
			res.redirect('/');
		})
		.catch(err => console.log(err));
});
module.exports = router;
