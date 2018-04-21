const router = require('express').Router();
const Board = require('../models/board');

router.route('/')
// create a board (accessed at POST http://localhost:8080/boards)
.post(function (req, res) {
	let board = new Board();		// create a new instance of the Board model
	board.userId = req.body.type;
	board.type = req.body.type;
	board.title = req.body.title;
	board.content = req.body.content;
	board.latitude = req.body.latitude;
	board.longitude = req.body.longitude;

	console.log("req==>", req);

	board.save(function (err) {
		if (err)
			res.send(err);
		res.json({message: 'Board created!'});
	});
})
// get all the boards
.get(function (req, res) {
	console.log("request get ");
	Board.find(function (err, boards) {
		if (err)
			res.send(err);
		res.json(boards);
	});
});

// on routes that end in /boards/:board_id
router.route('/:type/:board_id?')
// get the board with that id
.get(function (req, res) {
	console.log("req.params.type==",req.params.type);
	console.log("req.params.board_id==",req.params.board_id);
	console.log("req.query.board_id==",req.query.board_id);
	var param = {type:req.params.type};
	if(req.params.board_id){param._id = req.params.board_id;}
	Board.find(param, function (err, board) {
		if (err)
			res.send(err);
		res.json(board);
	});
})
// update the board with this id
.put(function (req, res) {
	Board.findById(req.params.board_id, function (err, board) {
		if (err)
			res.send(err);

		if (req.body.type) {
			board.type = req.body.type;
		}
		if (req.body.title) {
			board.title = req.body.title;
		}
		if (req.body.content) {
			board.content = req.body.content;
		}
		board.save(function (err) {
			if (err)
				res.send(err);
			res.json({message: 'Board updated!'});
		});
	});
})
.delete(function (req, res) {
	Board.remove({
		_id: req.params.board_id
	}, function (err) {
		if (err)
			res.send(err);
		res.json({message: 'Successfully deleted'});
	});
});

module.exports = router;
