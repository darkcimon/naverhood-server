var mongoose     = require('mongoose');
var board = require('./board');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name: String,
    boards: [{type:Schema.ObjectId,ref:board}]
});

module.exports = mongoose.model('User', UserSchema);
