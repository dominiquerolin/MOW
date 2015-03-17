var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('Volunteer', {
	username: String,
	first_name: String,
	last_name: String,
	phone : {type:Array, default:[null]},
	address : {
		line1 : String,
		line2 : String,
		zip : String,
		city : String

	},
	availability : {
		roles: Array, // Driver,Kitchen,Office
		frequency : {type: Array, default: [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]},
		exceptions : Array
	},
	driver: {
		car_registration : String,
		insurer : String,
		policy_nr : String,
		routes : Array
	}
});