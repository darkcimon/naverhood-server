const router = require('express').Router();
const User = require('../models/user');

router.route('/')
// create a user (accessed at POST http://localhost:8080/users)
.post(function (req, res) {
	let user = new User();		// create a new instance of the User model

	user.email = req.body.email;
	user.password = req.body.password;
	user.name = req.body.name;

	console.log("req==>", req);
	console.log("query==>", req.query);

	user.save(function (err) {
		if (err)
			res.send(err);
		res.json({message: 'User created!'});
	});
})
// get all the users
.get(function (req, res) {
	console.log("request get ");
	User.find(function (err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});
});

// on routes that end in /users/:user_id
router.route('/:email')
// get the user with that id
.get(function (req, res) {
	User.findById(req.params.email, function (err, user) {
		if (err)
			res.send(err);
		res.json(user);
	});
})
// update the user with this id
.put(function (req, res) {
	User.findById(req.params.email, function (err, user) {
		if (err)
			res.send(err);
		if (req.body.name) {
			user.name = req.body.name;
		}
		if (req.body.email) {
			user.email = req.body.email;
		}
		if (req.body.password) {
			user.password = req.body.password;
		}
		user.save(function (err) {
			if (err)
				res.send(err);
			res.json({message: 'User updated!'});
		});
	});
})
.delete(function (req, res) {
	User.remove({
		_id: req.params.user_id
	}, function (err) {
		if (err)
			res.send(err);
		res.json({message: 'Successfully deleted'});
	});
});

module.exports = router;
