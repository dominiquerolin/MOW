var mongoose = require('mongoose');

module.exports = mongoose.model('Driver', {
	username : String,
	car_registration : String,
	insurer : String,
	policy_nr : String,
	routes : Array
});