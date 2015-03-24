var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username : String,
	email : String,
	password: String, // md5
	active : {type:Boolean, default:true},
	role: {type:Number, default:0},// 0:User, 1:Admin, 2:SuperAdmin
	date_created: {type:Date, default:Date.now}
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);