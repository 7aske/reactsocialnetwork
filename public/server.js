const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const path = require('path');
const port = process.env.PORT || 3001;

const connections = require('./routes/connections');
const router = require('./routes/router');
const api = require('./routes/api');
const users = require('./routes/users');
const posts = require('./routes/posts');

/////////////////////////////
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
////////////////////////

process.env.DEVELOPMENT = true;
if (process.env.DEVELOPMENT) {
	server.use(express.static(path.join(__dirname, 'static')));
}

const dbpass = (process.env.DBPASS = 'adminpass123');
const url = `mongodb+srv://admin:${dbpass}@cluster0-r8s3l.mongodb.net/socialnetwork`;
mongoose
	.connect(url)
	.then(result => console.log('Connected to the database.'))
	.catch(err => console.log(err));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(
	expressValidator({
		errorFormatter: (param, msg, value) => {
			let namespace = param.split('.'),
				root = namespace.shift(),
				formParam = root;
			while (namespace.length) {
				formParam += '[' + namespace.shift() + ']';
			}
			return {
				param: formParam,
				msg: msg,
				value: value
			};
		}
	})
);
server.use(cookieParser());
server.use('/users', users);
server.use('/connections', connections);
server.use('/posts', posts);
server.use('/api', api);
server.use('/', router);

server.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
