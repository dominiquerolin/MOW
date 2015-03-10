var mongoose = require('mongoose');

// define our volunteer model & mongodb schema
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Volunteer', {
	username : String,
	email : String,
	active : Boolean,
	phone : Array,
	address : {
		line1 : String,
		line2 : String,
		zip : String,
		city : String
	},
	car : {
		registration : String,
		insurance : {
			insurer : String,
			policy_nr : String
		}
	}
});
