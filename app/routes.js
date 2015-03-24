module.exports = function(app) {

	
	// Generic callback function for all APIs
	function sendJSON(res, err, data, msg) {
		if(err) res.json({status:false, message:err, data:null});
		else if (!data) res.json({status:false, message:'No results', data:null});
		else res.json({status:true, message: (!msg?'Success':msg), 'data': data}); 
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

	// AUTHENTICATION
	// =========================================================
	var passport = require('passport');
	var User = require('./models/user');

	app.post('/register', function(req, res) {
		console.log('register new user',req)
	    User.register(new User({ username : req.body.username }), req.body.password, function(err, data) {
	        if (err) {
	        	return sendJSON(res,err.message,data);
	        }
	        console.log('authenticate with passport');
	        passport.authenticate('local')(req, res, function () {
	        	return sendJSON(res,err,data,'Auth OK');
	        });
	    });
	});
	app.post('/login', function(req, res, next) {
        console.log('POST /login');
		passport.authenticate('local', function(err, data, msg) {
	        console.log('authenticate with passport');
			if(err)
				return sendJSON(res,'Error authenticating',data,msg);
			if(!data)
				return sendJSON(res,'Wrong username or password',data,msg);

			req.login(data, function(err) {
		        console.log('login with passport');
				return sendJSON(res, err, data, (err?null:'Logged in'));
			});
		})(req, res, next);
	});
	
	app.get('/logout', function(req, res) {
        console.log('logout');
	    req.logout();
	    res.redirect('/');
	});
	
	// FRONT-END routes
	// =========================================================
	// handled by Angular in /public/js/routes.js
	app.get('*', function(req, res) {
		console.log('req.session.passport:',req.session.passport);
		res.sendfile('./public/views/index.html');
	});
};