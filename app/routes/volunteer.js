var Volunteer = require('../models/volunteer'),
	SchemaParser = require('../modules/schemaParser');

module.exports = function(app) {

	// =====================================================================
	// API ROUTES
	// get volunteer by username
	app.get('/api/volunteers/:username', function(req, res,next) {
		Volunteer.where({username:req.params.username}).findOne(function(err, data) {
			if (err)
				return next(err);
			else
				SchemaParser(Volunteer.schema, function(err, schema) {
					if(err) 
						throw(err);
					else 
						res.json({'data':data, 'schema': schema });
			});
		});
	});

	// update volunteer by id
	app.put('/api/volunteers/:id', function(req, res,next) {
		Volunteer.findByIdAndUpdate(req.params.id, req.body, function(err, data) {
			if (err)
				return next(err);
			else
				res.json(data);
		});
	});
	app.post('/api/volunteers', function(req, res, next) {
		// check if username exists
		Volunteer.where({username: req.body.username}).find(function(err, data) {
			if (err)
				return next(err);
			if(data.length>0) {
				console.log(data);
				return next("Username "+req.body.username+" already exists.");
			}
			Volunteer.create(req.body, function(err, data) {
				if (err)
					return next(err);
				else
					res.json(data);
			});
		});
	});

	// route to handle delete goes here (app.delete)
	app.delete('/api/volunteers/:id', function(req,res,next){
		Volunteer.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		    if (err) return next(err);
		    res.json(post);
		});
	});
	// default route (get) retrieves all volunteers
	app.get('/api/volunteers', function(req, res,next) {
		Volunteer.find(function(err, data) {
			if (err)
				return next(err);
			else
				res.json(data);
		});
	});
	

};