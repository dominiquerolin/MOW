var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('Roster', {
	day: String,
	ord: Number,
	staff: Array
});