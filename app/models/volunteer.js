
var mongoose = require('mongoose');

// define our volunteer model & mongodb schema
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Volunteer', {
    username : {type : String},
	email : {type : String},
	active : {type : Boolean, default: true}
});
