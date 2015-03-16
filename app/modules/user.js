var User = require('../models/user');

module.exports = {
	getAll : function(callback) {
			if(typeof(callback)!='function')
				throw 'User.getAll() requires a callback function';
			
			User.find(function(err, result) {
				if (err)
					callback(err);
				else
					callback(null, result);
			});
	},
	get: function(o, callback){
		if(typeof(callback)!='function')
			throw 'User.get() requires a callback function';
		if(typeof(o)!='object') 
			return callback('Invalid argument');

		User.where(o).findOne(function(err, result) {
			if (err)
				return callback(err);
			else if(!result)
				return callback('User not found');
			else
				return callback(null, result);
				
		});	
	},
	exists: function(o, callback) {
		if(typeof(callback)!='function')
			throw 'User.exists() requires a callback function';
		if(typeof(o)!='object') 
			return callback('Invalid argument');

		User.where(o).findOne(function(err, result) {
			if (err)
				return callback(err);
			else if(!result)
				return callback(null, false);
			else
				return callback(null, true);
				
		});
	},
	create: function(o, callback){
		if(typeof(callback)!='function')
			throw 'User.create() requires a callback function';
		if(typeof(o)!='object')
			return callback('Invalid argument');

		if(!o.username)
			return callback('Missing argument: username');
		if(!o.email)
			return callback('Missing argument: email');
		if(!o.password)
			return callback('Missing argument: password');
		
		o.active = true;
		o.role = 0;

		// check if username exists
		this.exists(o, function(err, result){
			if(err)
				return callback(err);
			else if(result)
				return callback('Username already exists');
			else {
				User.create(o, function(err, result){
					if (err) {
						return callback(err);
					} else {
						return callback(null, result);
					}
				});
			}
		});
	},
	update: function(id, o, callback){
		if(typeof(callback)!='function')
			throw 'User.update() requires a callback function';

		User.findByIdAndUpdate(id, o, function(err, result) {
			if (err) {
				return callback(err);
			} else {
				return callback(null, result);
			}
		});
	},
	remove: function(id, callback){
		if(typeof(callback)!='function')
			throw 'User.remove() requires a callback function';
		
		User.findByIdAndRemove(id, function (err, result) {
			if (err) {
				return callback(err);
			} else {
				return callback(null, result);
			}
		});
	},
	isActive: function(){},
	isAdmin: function(){},
	isSuperAdmin: function(){},
	checkPassword: function(){}
};