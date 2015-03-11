var expect = require("chai").expect;

var parser = require('../app/modules/availabilityParser.js');

var bad_array = [1,2,3,4,5];
var good_array = [[1,0,1,0,0], // mon
	 			 [1,0,1,0,0], // tue
	 			 [0,0,0,0,0], // wed
	 			 [0,0,0,0,0], // thu
	 			 [0,0,0,0,0]]; // fri
var bad_string = 'This is a bad string'
var good_string = '1010010100000000000000000';
var bad_integer = 43253761;
var good_integer = 21626880;


describe('availabilityParser', function (){
	describe('#parser', function(){
		it('should have a "toBinary" method', function(){
			expect(typeof(parser.toBinary)).to.equal('function');
		});
		it('should have a "toInteger" method', function(){
			expect(typeof(parser.toInteger)).to.equal('function');
		});
		it('should have a "toArray" method', function(){
			expect(typeof(parser.toArray)).to.equal('function');
		});
	
		describe('#parser.toBinary()', function(){
			it('should return false when the source is an invalid array', function(){
				expect(parser.toBinary(bad_array)).to.equal(false);
			});
			it('should return false when the source is an invalid string', function(){
				expect(parser.toBinary(bad_string)).to.equal(false);
			});
			it('should return the original string when the source is a valid string', function(){
				expect(parser.toBinary(good_string)).to.equal(good_string);
			});
			it('should return a 25 character string when the source is a valid array', function(){
				var result = parser.toBinary(good_array);
				expect(typeof(result)).to.equal('string');
				expect(result.length).to.equal(25);
			});
			it('should return a 25 character string when the source is a valid integer', function(){
				var result = parser.toBinary(good_integer);
				expect(typeof(result)).to.equal('string');
				expect(result.length).to.equal(25);
			});
		});

		describe('#parser.toInteger()', function(){
			it('should return false when the source is an invalid array', function(){
				expect(parser.toInteger(bad_array)).to.equal(false);
			});
			it('should return false when the source is an invalid string', function(){
				expect(parser.toInteger(bad_string)).to.equal(false);
			});
			it('should return the original integer when the source is an integer', function(){
				expect(parser.toInteger(good_integer)).to.equal(good_integer);
			});
			it('should return an integer when the source is a valid array', function(){
				var result = parser.toInteger(good_array);
				expect(typeof(result)).to.equal('number');
				expect(result).to.equal(good_integer);
			});
			it('should return an integer when the source is a valid string', function(){
				var result = parser.toInteger(good_integer);
				expect(typeof(result)).to.equal('number');
				expect(result).to.equal(good_integer);
			});
		});

		describe('#parser.toArray()', function(){
			it('should return the original array when the source is an array', function(){
				expect(parser.toArray(good_array)).to.equal(good_array);
			});
			it('should return false when the source is an invalid integer', function(){
				expect(parser.toArray(bad_integer)).to.equal(false);
			});
			it('should return false when the source is an invalid string', function(){
				expect(parser.toArray(bad_string)).to.equal(false);
			});
			it('should return false when the source is an invalid array', function(){
				expect(parser.toArray(bad_array)).to.equal(false);
			});
			it('should return an array when the source is a valid string', function(){
				var result = parser.toArray(good_string);
				expect(result instanceof Array).to.equal(true);
				expect(result).to.deep.equal(good_array);
			});
			it('should return an array when the source is a valid integer', function(){
				var result = parser.toArray(good_integer);
				expect(result instanceof Array).to.equal(true);
				expect(result).to.deep.equal(good_array);
			});
		});

	});
});