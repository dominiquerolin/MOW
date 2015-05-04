module.exports = function(app) {

	
	// Generic callback function for all APIs
	function sendJSON(res, err, data, msg) {
		if(err) res.json({status:false, message:err, data:null});
		else if (!data) res.json({status:false, message:'No results', data:null});
		else res.json({status:true, message: (!msg?'Success':msg), 'data': data}); 
	}

	
	// OPEN API
	// =========================================================
	// Supports the following queries api/calendar/YYYY (whole year)
	// api/calendar/YYYY/MM (single month) api/calendar/YYYY/MM-MM (range)
	app.get('/api/calendar/:year/:month?', function(req, res) {
		var Calendar = require('./modules/calendar');
		Calendar.getCalendars(req.params.year, req.params.month, function(err,data){ sendJSON(res,err,data); });
	});

	app.get('/api/me', function(req,res) {
		 res.json(req.user ? req.user : null);
	});


	// AUTHENTICATION
	// =========================================================
	var passport = require('passport');
	var User = require('./models/user');

	app.post('/register', function(req, res) {
		//console.log('register new user',req)
	    User.register(new User({ username : req.body.username }), req.body.password, function(err, data) {
	        if (err) {
	        	return sendJSON(res,err.message,data);
	        }
	        //console.log('authenticate with passport');
	        passport.authenticate('local')(req, res, function () {
	        	return sendJSON(res,err,data,'Auth OK');
	        });
	    });
	});
	app.post('/login', function(req, res, next) {
        console.log('POST /login');
		passport.authenticate('local', function(err, data, msg) {
	        //console.log('authenticate with passport');
			if(err)
				return sendJSON(res,'Error authenticating',data,msg);
			if(!data)
				return sendJSON(res,'Wrong username or password',data,msg);

			req.login(data, function(err) {
		        //console.log('login with passport', req.user);
				return sendJSON(res, err, data, (err?null:'Logged in'));
			});
		})(req, res, next);
	});
	
	app.post('/logout', function(req, res) {
		req.user = null;
		req.session.passport = null;
		req.logout();
		res.redirect('/');
	});

	
	// RESTRICTED API
	// =========================================================
	//read
	app.get('/api/*', function(req,res,next){
		if(req.user) {
			console.log('Auth OK', req.user);
			next();
		} else {
			console.log('Auth failed');
			sendJSON(res, 'Authentication required', null);
		}
	});
	app.get('/api/:model', function(req,res,next){
		console.log('route check : model');
		if(['roster','user','volunteer'].indexOf(req.params.model)<0) {
			sendJSON(res, 'Wrong parameters', null);
			return;
		}
		else next();
	})
	app.get('/api/:model/:p1?/:p2?', function(req, res) {
		console.log('GET', req.params);
		var CRUD = require('./modules/crud')(req.params.model);
		CRUD.get(req.params, function(err,data){
			console.log('DATA', data);
			sendJSON(res,err,data);
		});
	});
	// create/update
	app.post('/api/:model/:p1?/:p2?', function(req, res) {
		var CRUD = require('./modules/crud')(req.params.model);		
		
		console.log('update existing '+':'+req.params.username);
		CRUD.update({'username':req.params.username}, req.body, function(err,data){ 
			if(err || !data) {
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
		Volunteer.remove({'username':req.params.username}, function(err, volunteerData){
			if(err)
				sendJSON(res,err,volunteerData);
			else {
				var User = require('./modules/crud')('user');
				User.remove({'username':req.params.username}, function(err, userData){
					sendJSON(res,err,userData); 
				});
			}
		});
		
	});
	app.delete('/api/volunteer/:username', function(req,res){
		var Volunteer = require('./modules/crud')('volunteer');
		//console.log('delete volunteer :'+req.params.username);
		Volunteer.remove(req.params, function(err, volunteerData){
			sendJSON(res,err,volunteerData);
		});
		
	});	// FRONT-END routes
	// =========================================================
	// handled by Angular in /public/js/routes.js
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});
};