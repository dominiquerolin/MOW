module.exports = function(model) {
	this.db = require('../models/'+model);
	
	this.getAll = function(callback) {
		this.db.find(function(err, data) {
			return err && callback(err) || callback(null, data);
		});
	};
	
	this.get = function(username, callback){
		this.db.findOne({'username':username}, function(err, data) {
			return err && callback(err) || callback(null, data);
		});
	};

	this.create = function(obj, callback) {
		this.db.create(obj, function(err, data){
			return err && callback(err) || callback(null, data);
		})
	};
	this.update = function(username, obj, callback) {
		this.db.findOneAndUpdate({'username':username}, obj, function(err, data){
			if(err) {
				console.log('ERR:',err);
				return callback(err);
			}
			return callback(null, data);
		});
	};
	this.remove = function(username, callback){
		this.db.findOneAndRemove({'username':username}, function(err, data){
			return err && callback(err) || callback(null, data);
		});
	};
	return this;
};