var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
	userId:{type: String, required: true},
	type: {type: String, required: true, enum: ['work', 'hobby', 'town' ]},
	title: String,
	content: String,
	latitude: {type: Number},
	longitude: {type: Number}
});
module.exports = mongoose.model('Board', BoardSchema);
