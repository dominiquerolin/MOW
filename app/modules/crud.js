module.exports = function(model) {
	this.db = require('../models/'+model);
	
	this.get = function(params, callback){
		// Get all results
		if(!params.p1) {
			return this.db.find(function(err, data) {
				return err && callback(err) || callback(null, data);
			});
		}
		// get a single result
		if(params.model == 'roster') {	
			if(params.p1 && !params.p2)
				return callback('Missing parameter "ord".');
			else
				var search = {day: params.p1, ord: params.p2};
		} else {
			var search = {username: params.p1};
		}
		return this.db.findOne(search, function(err, data) {
			return err && callback(err) || callback(null, data);
		});
	};

	this.create = function(obj, callback) {
		this.db.create(obj, function(err, data){
			return err && callback(err) || callback(null, data);
		})
	};
	this.update = function(search, obj, callback) {
		this.db.findOneAndUpdate(search, obj, function(err, data){
			if(err) {
				console.log('ERR:',err);
				return callback(err);
			}
			return callback(null, data);
		});
	};
	this.remove = function(search, callback){
		this.db.findOneAndRemove(search, function(err, data){
			return err && callback(err) || callback(null, data);
		});
	};
	return this;
};