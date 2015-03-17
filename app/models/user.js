var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username : String,
	email : String,
	password: String, // md5
	active : {type:Boolean, default:true},
	role: {type:Number, default:0},// 0:User, 1:Admin, 2:SuperAdmin
	date_created: {type:Date, default:Date.now}
});