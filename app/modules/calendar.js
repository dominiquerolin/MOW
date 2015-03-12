module.exports = {
	format : function( d ){
		var res = [d.getFullYear()];
		res.push( ('00' + (d.getMonth()+1)).slice(-2) );
		res.push( ('00' + d.getDate()).slice(-2) );
		return res.join('-');
	},
	sameDay : function(date1, date2) {
		return (date1.getFullYear() == date2.getFullYear()
				&& date1.getMonth() == date2.getMonth() 
				&& date1.getDate() == date2.getDate());
	},
	getFirstDayOfMonth : function(d) {
		if (!(d instanceof Date))
			return false;
		d.setDate(1);
		return d;
	},
	getLastDayOfMonth : function(d) {
		if (!(d instanceof Date))
			return false;
		d.setMonth(d.getMonth() + 1);
		d.setDate(0);
		return d;
	},
	getMonthArray : function(d) {
		if (!(d instanceof Date))
			return false;

		var cal = [];
		var week = [];
		var currentMonth = d.getMonth();
		d.setDate(1); // reset to beginning of month
		while(d.getMonth()==currentMonth) {
			if(week && week.length == 5) { // push completed week and reset array
				cal.push(week);
				week = [];
			}
			if(d.getDay()!=0 && d.getDay()!=6) { // skip weekends
				if(cal.length==0 && d.getDay()>1) { // pad first week if needed
					while(week.length<d.getDay()-1) {
						week.push(null);
					}
				}
				week.push(d.getDate());
			}
			d.setDate(d.getDate()+1); // get next day
		}
		while(week.length<5) week.push(null); // pad last week if needed
		cal.push(week);
		return cal;
	}
};