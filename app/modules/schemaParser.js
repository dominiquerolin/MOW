module.exports = function(schema, callback){
	var paths = schema.paths, parsed = {};
	console.log('Parsing mongoose schema');
	for(p in paths) {
		if(p.indexOf('_')!=-1) continue;
		switch(paths[p].instance) {
			case 'String':
				break;
				
		}
	}
	callback(null, schema);
};