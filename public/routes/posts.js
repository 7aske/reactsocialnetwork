const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const config = require('../config/config');
const shortid = require('shortid');

router.post('/new', (req, res) => {
	console.log(req.body);
	const token = req.cookies['x-access-token'];

	req.checkBody('content', 'Enter some post content.').notEmpty();
	req.checkBody('owner', 'Invalid user.').notEmpty();
	if (req.validationErrors()) {
		let errors = req.validationErrors();
		res.status(400).send({ errors: errors });
	} else {
		User.findById({ _id: req.body.owner })
			.exec()
			.then(user => {
				if (user) {
					jwt.verify(token, config.secret, (err, decoded) => {
						if (err)
							res.status(400).send({
								errors: ['Invalid token.']
							});
						if (decoded) {
							if (token === user.token) {
								let id = shortid.generate();
								const newPost = new Post({
									_id: id,
									title: req.body.title,
									content: req.body.content,
									owner: req.body.owner
								});
								newPost
									.save()
									.then(result => {
										User.findOneAndUpdate(
											{ _id: req.body.owner },
											{ $push: { posts: id } }
										)
											.exec()
											.then(result => console.log(result))
											.catch(err => console.log(err));
									})
									.catch(err => console.log(err));
							}
						}
					});
				} else {
					res.status(404).send({ errors: ['User not found.'] });
				}
			})
			.catch(err => console.log(err));
		res.status(201).send({ success: 1 });
	}
});
router.get('/', (req, res) => {
	const token = req.cookies['x-access-token'];
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err)
			res.status(400).send({
				errors: ['Invalid token.']
			});
		if (decoded) {
			User.findOne({ token: token })
				.select({ posts: 1, firstName: 1, lastName: 1, _id: 1 })
				.exec()
				.then(user => {
					let posts = user.posts;
					Post.find({ _id: { $in: posts } })
						.exec()
						.then(result => {
							res.status(200).send({
								posts: result,
								user: user
							});
						})
						.catch(err => console.log(err));
				})
				.catch(err => console.log(err));
		}
	});
});
module.exports = router;
