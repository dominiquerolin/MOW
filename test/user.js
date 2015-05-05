var expect = require("chai").expect,
	should = require("should");
var mongoose       = require('mongoose');
var db = require('../config/db');
var User = require('../app/modules/crud')('user');

var new_user = {username:'new_user', email:'user@me.com', password:'user'};
var bad_user = {username:'tonyabott'};

var db;

describe('User', function(){
	
	before(function(done) {
        db = mongoose.connect(db.url, function(err) {
    		if(err) return done(err); 
            done();
    	});
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });

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
	describe('#User.create()', function(){
		it('should return an error when argument is not valid', function(done){
			User.create('Invalid argument', function(err, u){
				//console.log(err, u);
				should.exist(err);
				should.not.exist(u);
				done();
			});
		});
		it('should return an error when argument is incomplete', function(done){
			User.create({'username':'new_user'}, function(err, u){
				//console.log(err, u);
				should.exist(err);
				should.not.exist(u);
				done();
			});
		});
		it('should return a single user when argument contains all required properties', function(done){
			User.create(new_user, function(err, u){
				//console.log(err, u);
				should.not.exist(err);
				should.exist(u);
				expect(u.username).to.equal(new_user.username);
				expect(u.email).to.equal(new_user.email);
				expect(u.password).to.exist;
				done();
			});
		});
	});
	describe('#User.get()', function(){
		it('should return an array of users when no argument is passed', function(done){
			User.get(null, function(err, u){
				//console.log(err, u);
				should.not.exist(err);
				should.exist(u);
				expect(u).to.be.a('array');
				done();
			});				
		});
		it('should return an error when argument is not valid', function(done){
			User.get('Invalid argument', function(err, u){
				//console.log(err, u);
				should.exist(err);
				should.not.exist(u);
				done();
			});
		});
		it('should return null when user not found', function(done){
			User.get(bad_user, function(err, u){
				//console.log(err, u);
				should.not.exist(err);
				should.not.exist(u);
				done();
			});
		});
		it('should return a single user when an object is passed as argument', function(done){
			User.get(new_user, function(err, u){
				//console.log(err, u);
				should.not.exist(err);
				should.exist(u);
				expect(u.username).to.equal(new_user.username);
				done();
			});
		});
	});
	describe('#User.delete()', function(){
		it('should return an error when argument is invalid', function(done){
			User.remove('Invalid argument', function(err, u){
				//console.log(err, u);
				should.exist(err);
				should.not.exist(u);
				done();
			});
		});
		it('should return a single user after deletion', function(done){
			User.remove(new_user, function(err,u){
				//console.log(err, u);
				should.not.exist(err);
				expect(u).to.be.a('object');
				expect(u.username).to.equal(new_user.username);
				done();
			})
		});
		it('should not have the user in the db after deletion', function(done){
			User.get(new_user, function(err, u) {
				//console.log(err, u);
				should.not.exist(err);
				should.not.exist(u);
				done();
			});
		});
	});
});
