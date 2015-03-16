var expect = require("chai").expect;
var mongoose       = require('mongoose');
var db = require('../config/db');
var User = require('../app/modules/user');

var new_user = {username:'new_user', email:'user@me.com', password:'user'};
var existing_user = {username:'eraserqueen'};
var bad_user = {username:'tonyabott'};

mongoose.connect(db.url, function(err) {
	if(err) console.log("Cannot connect to DB");
	else {
		console.log("Connected to DB");
	}
});


describe('User', function(){
	it('should have a get method', function(){
		expect(typeof(User.get)).to.equal('function');
	});
	it('should have a create method', function(){
		expect(typeof(User.create)).to.equal('function');
	});
	it('should have a update method', function(){
		expect(typeof(User.update)).to.equal('function');
	});
	it('should have a remove method', function(){
		expect(typeof(User.remove)).to.equal('function');
	});
	it('should have a isActive method', function(){
		expect(typeof(User.isActive)).to.equal('function');
	});
	it('should have a isAdmin method', function(){
		expect(typeof(User.isAdmin)).to.equal('function');
	});
	it('should have a isSuperAdmin method', function(){
		expect(typeof(User.isSuperAdmin)).to.equal('function');
	});
	it('should have a checkPassword method', function(){
		expect(typeof(User.checkPassword)).to.equal('function');
	});
	describe('#User.create()', function(){
		it('should return false when argument is not valid', function(){
			User.create('Invalid argument', function(u){
				expect(u.status).to.equal(false);
				expect(u.message).to.equal('Invalid argument');					
			});
		});
		it('should return false when argument is incomplete', function(){
			User.create({username:'new_user'}, function(u){
				expect(u.status).to.equal(false);
				expect(u.message).to.contain('Missing argument');					
			});
		});
		it('should return a single user when argument contains all required properties', function(){
			User.create(new_user, function(u){
				expect(u.status).to.equal(true);
				expect(u.data.username).to.equal(new_user.username);	
			});
		});
	});
	describe('#User.get()', function(){
		it('should return an array of users when no argument is passed', function(){
			User.get(function(u){
				expect(typeof(u.data)).to.equal('array');
			});				
		});
		it('should return an error when argument is not valid', function(){
			User.get('Invalid argument', function(u){
				expect(u.status).to.equal(false);
				expect(u.message).to.equal('Invalid argument');					
			});
		});
		it('should return an error when user not found', function(){
			User.get(bad_user, function(u){
				expect(u.status).to.equal(false);
				expect(u.message).to.equal('User not found');					
			});
		});
		it('should return a single user when an object is passed as argument', function(){
			User.get(existing_user, function(u){
				expect(u.status).to.equal(true);
				expect(u.data.username).to.equal(existing_user.username);					
			});
		});
	});
});
