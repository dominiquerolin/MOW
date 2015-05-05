module.exports = function(model) {
	this.model = model;
	this.db = require('../models/'+model);
	
	this.get = function(search, callback){
		if(!search) {
			//console.log('GET ALL FROM DB');
			return this.db.find(function(err, data) {
				return err && callback(err, null) || callback(null, data);
			});
		}
		if(typeof(search)!='object')
			return callback('Invalid search parameter: "'+search+'"', null);
		
		//console.log('GET SINGLE RESULT FROM DB', search);	
		return this.db.findOne(search, function(err, data) {
			return err && callback(err, null) || callback(null, data);
		});
	};

	this.create = function(obj, callback) {
		//console.log('ADD TO DB', obj);
		if(this.model == 'user') {
			if(!obj.username || !obj.password)
				return callback('Missing parameter', null);
		}
		try {
			this.db.create(obj, function(err, data){
				return err && callback(err, null) || callback(null, data);
			});
		} catch (ex) {
			return callback(ex, null);
		}
	};
	this.update = function(search, obj, callback) {
		//console.log('UPDATE IN DB', search, obj);
		if(typeof(search)!='object')
			return callback('Invalid search parameter: "'+search+'"', null);
		if(typeof(obj)!='object')
			return callback('Invalid update parameter: "'+obj+'"', null);
		this.db.findOneAndUpdate(search, obj, function(err, data){
			if(err) {
				//console.log('ERR:',err);
				return callback(err, null);
			}
			return callback(null, data);
		});
	};
	this.remove = function(search, callback){
		//console.log('DELETE FROM DB', search);
		if(typeof(search)!='object')
			return callback('Invalid search parameter: "'+search+'"', null);
		try{
			this.db.findOneAndRemove(search, function(err, data){
				//console.log(err,data);
				return err && callback(err, null) || callback(null, data);
			});
		} catch(ex) {
			//console.log(ex);
			return callback(ex, null);
		}
	};
	return this;
};