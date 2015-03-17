module.exports = function(app) {

	
	// Generic callback function for all APIs
	function sendJSON(res, err,data) {
		if(err) res.json({status:false, message:err, data:null});
		else if (!data) res.json({status:false, message:'No results', data:null});
		else res.json({status:true, message: 'Success', 'data': data}); 
	}
	
	// USER API
	// =========================================================
	// read
	app.get('/api/:model/:username?', function(req, res) {
		var CRUD = require('./modules/crud')(req.params.model);
		if(!req.params.username) {
			console.log('get all ');
			CRUD.getAll(function(err,data){ sendJSON(res,err,data); });
		} else {
			console.log('get one '+':'+req.params.username);
			CRUD.get(req.params.username, function(err,data){ sendJSON(res,err,data); });
		}
	});
	// create/update
	app.post('/api/:model/:username?', function(req, res) {
		var CRUD = require('./modules/crud')(req.params.model);		
		
		console.log('update existing '+':'+req.params.username);
		CRUD.update(req.params.username, req.body, function(err,data){ 
			if(err || !data) {
				console.log('no existing volunteer found, create new ');
				CRUD.create(req.body, function(err,data){ sendJSON(res,err,data); });
			} else {
				sendJSON(res,err,data);
			}
		});
		
	});
	// delete (deleting user deletes assoctiated volunteer as well)
	app.delete('/api/user/:username', function(req,res){
		var Volunteer = require('./modules/crud')('volunteer');
		console.log('delete volunteer :'+req.params.username);
		Volunteer.remove(req.params.username, function(err, volunteerData){
			if(err)
				sendJSON(res,err,volunteerData);
			else {
				var User = require('./modules/crud')('user');
				console.log('delete user :'+req.params.username);
				User.remove(req.params.username, function(err, userData){
					sendJSON(res,err,userData); 
				});
			}
		});
		
	});
	app.delete('/api/volunteer/:username', function(req,res){
		var Volunteer = require('./modules/crud')('volunteer');
		console.log('delete volunteer :'+req.params.username);
		Volunteer.remove(req.params.username, function(err, volunteerData){
			sendJSON(res,err,volunteerData);
		});
		
	});

	// CALENDAR API
	// =========================================================
	// Supports the following queries api/calendar/YYYY (whole year)
	// api/calendar/YYYY/MM (single month) api/calendar/YYYY/MM-MM (range)
	app.get('/api/calendar/:year/:month?', function(req, res) {
		var Calendar = require('./modules/calendar');
		Calendar.getCalendars(req.params.year, req.params.month, function(err,data){ sendJSON(res,err,data); });
	});

	// FRONT-END routes
	// =========================================================
	// handled by Angular in /public/js/routes.js
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});
};