var expect = require("chai").expect;
var cal = require('../app/modules/calendar.js');

var bad_date = 'Bad Date';
var date_march = new Date(2015,2,16,0,0,0);
var date_first = new Date(2015,2,1,0,0,0);
var date_last = new Date(2015,2,31,0,0,0);
var array_march = [ // March 2015
                  [2,3,4,5,6], // monday to friday only
                  [9,10,11,12,13],
                  [16,17,18,19,20],
                  [23,24,25,26,27],
                  [30,31,null,null,null],
                  ];

describe('Calendar', function(){
	describe('#calendar', function(){
		it('should have a "sameDay" method', function(){
			expect(typeof(cal.sameDay)).to.equal('function');
		});
		it('should have a "getFirstDayOfMonth" method', function(){
			expect(typeof(cal.getFirstDayOfMonth)).to.equal('function');
		});
		it('should have a "getLastDayOfMonth" method', function(){
			expect(typeof(cal.getLastDayOfMonth)).to.equal('function');
		});
		it('should have a "getMonthArray" method', function(){
			expect(typeof(cal.getMonthArray)).to.equal('function');
		});
	});
	describe('#sameDay', function(){
		it('should return true when 2 date objects share the same day (different times)', function(){
			expect(cal.sameDay(new Date(2015,2,1,0,0,0), new Date(2015,2,1,12,30,0))).to.equal(true);
		});
		it('should return false when 2 date objects do not share the same day', function(){
			expect(cal.sameDay(date_first, date_last)).to.equal(false);
		});
		
	});
	describe('#getFirstDayOfMonth', function(){
		it('should return false when argument is not a date object', function(){
			expect(cal.getFirstDayOfMonth(bad_date)).to.equal(false);
		});
		it("should return a date object representing the first day of the month", function(){
			expect(cal.getFirstDayOfMonth(date_march).toJSON()).to.equal(date_first.toJSON());
		});		
	});
	describe('#getLastDayOfMonth', function(){
		it('should return false when argument is not a date object', function(){
			expect(cal.getLastDayOfMonth(bad_date)).to.equal(false);
		});
		it("should return a date object representing the last day of the month", function(){
			expect(cal.getLastDayOfMonth(date_march).toJSON()).to.equal(date_last.toJSON());
		});		
	});
	describe('#getMonthArray', function(){
		it('should return false when argument is not a date object', function(){
			expect(cal.getFirstMonday(bad_date)).to.equal(false);
		});
		it("should return an array containing all dates for date object month", function(){
			expect(cal.getMonthArray(date_march)).to.deep.equal(array_march);
		});
	});
});