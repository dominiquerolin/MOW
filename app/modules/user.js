var User = require('../models/user');
var Volunteer = require('../modules/volunteer');

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
	update: function(search, data, callback){
		if(typeof(callback)!='function')
			throw 'User.update() requires a callback function';

		if(typeof(search)!='object')
			search = {_id:search};
		
		if(typeof(data)!='object')
			return callback('Invalid argument #2 for User.update() : data must be an object')

		console.log('User.update');
		User.update(search, data, function(err, result){
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

		User.findById(id, function(err, user){
			if(err)
				return callback (err);
			
			var msg = '';
			if(!!user.volunteer_id) {
				console.log('removing volunteer data');
				Volunteer.remove(user.volunteer_id, function(err, volunteerData){
					if(err)
						return callback (err);
					else
						msg = 'Deleted volunteer data. ';
				});
				
			}
			user.remove(function(err, userData){
				if(err)
					return callback (msg+err);
				else
					return callback(null, msg+'Deleted user data.');
			});
		});
		
	}
};