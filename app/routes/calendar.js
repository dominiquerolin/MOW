var Calendar = require('../modules/calendar');
module.exports = function(app) {
	/**
	 * Supports the following queries api/calendar/YYYY (whole year)
	 * api/calendar/YYYY/MM (single month) api/calendar/YYYY/MM-MM (range)
	 * 
	 */
	app.get('/api/calendar/:year/:month?', function(req, res, next) {
		if (!req.params.year)
			res.json({error:true, message:'No year provided.', data:null});

		var range = [];
		var result = {};
		// return full year
		if (!req.params.month) {
			range = [ 0,11 ];
		} else if (Number(req.params.month)) {
			range = [ parseInt(req.params.month)-1, parseInt(req.params.month)-1 ];
		} else {
			// return month range
			var tmp = req.params.month.match(/^(\d+)\-(\d+)$/);

			if (tmp && tmp[1]<=12 && tmp[2]<=12 && tmp[1]<=tmp[2])
				range = [parseInt(tmp[1])-1, parseInt(tmp[2])-1];
		}

		if (range.length == 2) {
			for (month = range[0]; month <= range[1]; month++) {
				var date = new Date(req.params.year, month, 1);
				result[Calendar.format(date)] = Calendar.getMonthArray(date);
			}
			res.json({error:false, message: 'Success', data:result});
		} 
		else {
			res.json({error:true, message:'Invalid range provided.', data:range});
		}
	});
};