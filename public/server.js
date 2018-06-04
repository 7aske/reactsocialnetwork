const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const expressValidator = require('express-validator');
const path = require('path');
const port = process.env.PORT || 3001;

const router = require('./routes/router');
const api = require('./routes/api');
const users = require('./routes/users');

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
	session({
		secret: 'I LOVE PANCAKES',
		resave: true,
		saveUninitialized: true
	})
);
server.use(passport.initialize());
server.use(passport.session());

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

server.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

server.use('/users', users);
server.use('/api', api);
server.use('/', router);

server.listen(port, () => {
	console.log(`Server listening on port ${port}.`);
});
