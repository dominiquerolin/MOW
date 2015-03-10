module.exports = function(app) {

	// FRONT-END routes
	// =========================================================
	// handled by Angular in /public/js/routes.js
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // load our
													// public/index.html file
	});
	

};