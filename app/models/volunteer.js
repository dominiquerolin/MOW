var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('Volunteer', {
	username: String,
	first_name: String,
	last_name: String,
	phone : Array,
	address : {
		line1 : String,
		line2 : String,
		zip : String,
		city : String

	},
	role: Array, // Driver,Kitchen,Office
	availability : {
		frequency : {type: Array, default: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]},
		exceptions : Array
	}
});