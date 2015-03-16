var Calendar = require('./modules/calendar');
var User = require('./modules/user');
var Volunteer = require('./modules/volunteer');
var Driver = require('./modules/driver');
module.exports = function(app) {

	// USER API
	// =========================================================
	// read
	app.get('/api/users/:username?', function(req, res,next) {
		if(!req.params.username)
			User.getAll(function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		else
			User.get({username: req.params.username}, function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		
	});
	// create/update
	app.post('/api/users/:id?', function(req, res, next) {
		if(req.params.id) {
			console.log('update existing user');
			User.update(req.params.id, req.body, function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		} else {
			console.log('create new user');
			User.create(req.body, function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			 });
		}
	});
	// delete
	app.delete('/api/users/:id', function(req,res,next){
		User.remove(req.params.id, function(err, data){ 
			if(err) res.json({status:false, message:err});
			else res.json({status:true, 'data': data}); 
		});
	});

	// VOLUNTEER API
	// =========================================================
	// read
	app.get('/api/volunteers/:username?', function(req, res,next) {
		if(!req.params.username)
			Volunteer.getAll(function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		else
			Volunteer.get({username: req.params.username}, function(err, data){  
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		
	});
	// create/update
	app.post('/api/volunteers/:id?', function(req, res, next) {
		if(req.params.id)
			Volunteer.update(req.params.id, req.body, function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		else
			Volunteer.create(req.body, function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
	});
	// delete
	app.delete('/api/volunteers/:id', function(req,res,next){
		Volunteer.remove(req.params.id, function(err, data){ 
			if(err) res.json({status:false, message:err});
			else res.json({status:true, 'data': data}); 
		});
	});
	// DRIVER API
	// =========================================================
	// read
	app.get('/api/drivers/:username?', function(req, res,next) {
		if(!req.params.username)
			Driver.getAll(function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		else
			Driver.get({username: req.params.username}, function(err, data){  
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		
	});
	// create/update
	app.post('/api/drivers/:id?', function(req, res, next) {
		if(req.params.id)
			Driver.update(req.params.id, req.body, function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
		else
			Driver.create(req.body, function(err, data){ 
				if(err) res.json({status:false, message:err});
				else res.json({status:true, 'data': data}); 
			});
	});
	// delete
	app.delete('/api/drivers/:id', function(req,res,next){
		Driver.remove(req.params.id, function(err, data){ 
			if(err) res.json({status:false, message:err});
			else res.json({status:true, 'data': data}); 
		});
	});
	// CALENDAR API
	// =========================================================
	// Supports the following queries api/calendar/YYYY (whole year)
	// api/calendar/YYYY/MM (single month) api/calendar/YYYY/MM-MM (range)
	app.get('/api/calendar/:year/:month?', function(req, res, next) {
		Calendar.getCalendars(req.params.year, req.params.month, function(err, data){ 
			if(err) res.json({status:false, message:err});
			else res.json({status:true, 'data': data}); 
		});
	});

	// FRONT-END routes
	// =========================================================
	// handled by Angular in /public/js/routes.js
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // load our
		// public/index.html file
	});
};