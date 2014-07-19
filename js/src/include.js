


var include = function(opt){
	
	var recquire_t = require('recquire');

	var dflt = {
		ns    : undefined,
		src   : undefined,
		exports : undefined,
		base  : 0,
		index : 'index.js',
		intro : 'intro.js',
		outro : 'outro.js',
		rec : false,
		flat : true
	};

	opt = extend({}, dflt, opt);

	var recquire = recquire_t(opt.ns, opt.index, opt.intro, opt.outro, opt.rec, opt.flat);

	recquire(opt.src, opt.exports, -opt.base);

};


exports.include = include;