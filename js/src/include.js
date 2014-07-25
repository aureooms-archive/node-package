


var include = function(opt, handler){
	
	var recquire_t = require('recquire');
	var extend = require('node.extend');

	var dflt = {
		ns    : undefined,
		src   : undefined,
		exports : undefined,
		base  : 0,
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : false,
		flat : true,
		debug : false
	};

	opt = extend({}, dflt, opt);

	var recquire = recquire_t(opt);

	recquire(opt.src, opt.exports, -opt.base, handler);

};


exports.include = include;