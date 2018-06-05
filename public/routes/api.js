const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.get('/', (req, res) => {
	res.send('Hello API');
});
router.get('/user', (req, res) => {
	const token = req.cookies['x-access-token'];
	console.log(token);
	if (token !== '') {
		User.findOne({ token: token })
			.select({ firstName: 1, lastName: 1, email: 1, username: 1 })
			.exec()
			.then(user => {
				if (user) {
					console.log(user.username);
					// res.status(200).send({
					// 	firstName: user.firstName,
					// 	lastName: user.lastName,
					// 	email: user.email
					// });
					res.status(200).send(user);
				} else {
					res.status(404).send({ errors: ['No users found.'] });
				}
			})
			.catch(err => console.log(err));
	} else {
		res.status(404).send({ errors: ['No users found.'] });
	}
});

module.exports = router;
