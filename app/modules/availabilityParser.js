module.exports.isValidBinary = function(source) {
	return typeof (source) == 'string' && (/^[01]{25}$/).test(source);
};
module.exports.isValidArray = function(source) {
	if (!(source instanceof Array) || source.length != 5) {
		return false;
	} else {
		for(row in source){
			if (!(source[row] instanceof Array) || source[row].length != 5)
				return false;
		};
	}
	return true;
};
module.exports.isValidInteger = function(source) {
	return typeof (source) == 'number' && parseInt(source) <= 33554431;
};

module.exports.toBinary = function(source) {
	
	if (this.isValidBinary(source)) return source;

	if (this.isValidArray(source)) {
		var binary = '';
		source.forEach(function(row) {
			binary += row.join('');
		});
	}
	else if (this.isValidInteger(source)) {
		var pad = '000000000000000000000000000000'
				+ parseInt(source, 10).toString(2);
		binary = pad.substr(pad.length - 25, 25);
	}

	if (this.isValidBinary(binary))	return binary;
	return false;

};
module.exports.toInteger = function(source) {
	if(this.isValidInteger(source)) return source;
	if(this.isValidArray(source)) source = this.toBinary(source);
	if(this.isValidBinary(source)) {
		var integer = parseInt(source,2);
	}

	if(this.isValidInteger(integer)) return integer;
	return false;
};
module.exports.toArray = function(source) {
	if(this.isValidArray(source)) return source;
	if(this.isValidInteger(source)) source = this.toBinary(source);
	if(this.isValidBinary(source)) {
		var array = [];
		(source.match(/(\d{5})/g)).forEach(function(row){
			// BUG: row.split('').map(parseInt) makes the second index of every row NaN
			array.push( row.split('').map(function(v){return parseInt(v);}) );
		});		
		return array;
	}
	return false;
};