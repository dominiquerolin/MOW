var User = require('./user'); // the node module
var Volunteer = require('../models/volunteer'); // the mongoose model

module.exports = {
	getAll : function(callback) {
			if(typeof(callback)!='function')
				throw 'Callback function missing';
			
			Volunteer.find(function(err, result) {
				if (err)
					callback(err);
				else
					callback(null, result);
			});
	},
	get: function(o, callback){
		if(typeof(callback)!='function')
			throw 'Callback function missing';
		if(typeof(o)!='object') 
			return callback( 'Invalid argument');
		
		Volunteer.where(o).findOne(function(err, result) {
			if (err)
				return callback(err);
			else if(!result)
				return callback( 'Volunteer not found');
			else 
				return callback(null, result);
				
		});
	
	},
	create: function( o, callback){
		if(typeof(callback)!='function')
			throw 'Callback function missing';
		if(typeof(o)!='object')
			return callback( 'Invalid argument');
		if(!o.username)
			return callback( 'Missing argument: username');
		
		//check if user exist
		console.log("check if user exist", o.username);
		User.get({username:o.username}, function(err,result){
			if(err) return callback(err);
			
			// create volunteer with same username
			Volunteer.create(o, function(err, volunteerData){
				if (err) {
					return callback(err);
				} else {
					User.update({username:o.username}, {volunteer_id:volunteerData._id}, function(err, userData){
						if (err)
							return callback(err);
						else
							return callback(null, volunteerData);
					});					
				}
			});
			
		});
	},
	update: function(id, o, callback){
		if(typeof(callback)!='function')
			throw 'Callback function missing';
		
		Volunteer.findByIdAndUpdate(id, o, function(err, volunteerData) {
			if (err) {
				return callback(err);
			} else {
				User.update({username:o.username}, {volunteer_id:volunteerData._id}, function(err, userData){
					if (err)
						return callback(err);
					else
						return callback(null, volunteerData);
				});			
			}
		});
	},
	remove: function(id, callback){
		if(typeof(callback)!='function')
			throw 'Callback function missing';
		Volunteer.findByIdAndRemove(id, function (err, result) {
			if (err) {
				return callback(err);
			} else {
				return callback(null, result);
			}
		});
	}
};