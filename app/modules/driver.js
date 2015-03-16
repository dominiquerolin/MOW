var User = require('./user'); // the node module
var Driver = require('../models/driver'); // the mongoose model

module.exports = {
	getAll : function(callback) {
			if(typeof(callback)!='function')
				throw 'Callback function missing';
			
			Driver.find(function(err, result) {
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
		
		Driver.where(o).findOne(function(err, result) {
			if (err)
				return callback(err);
			else if(!result)
				return callback( 'Driver not found');
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
			Driver.create(o, function(err, result){
				if (err) {
					return callback(err);
				} else {
					return callback(null, result);
				}
			});
			
		});
	},
	update: function(id, o, callback){
		if(typeof(callback)!='function')
			throw 'Callback function missing';
		Driver.findByIdAndUpdate(id, o, function(err, result) {
			if (err) {
				return callback(err);
			} else {
				return callback(null, result);
			}
		});
	},
	remove: function(id, callback){
		if(typeof(callback)!='function')
			throw 'Callback function missing';
		Driver.findByIdAndRemove(id, function (err, result) {
			if (err) {
				return callback(err);
			} else {
				return callback(null, result);
			}
		});
	}
};