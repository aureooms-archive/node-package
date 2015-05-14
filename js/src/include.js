


var include = function(opt, handler){

	var recquire_t = require('aureooms-node-recursive-require');
	var extend = require('node.extend');

	var dflt = {
		name    : undefined,
		src     : undefined,
		exports : undefined,
		base    : 0,
		index   : 'index.js',
		intro   : 'intro.js',
		outro   : 'outro.js',
		rec     : false,
		flat    : true,
		debug   : false
	};

	opt = extend({}, dflt, opt);

	if ( opt.name ) opt.name = opt.name.replace( /-/g , '' ) ;

	var recquire = recquire_t(opt);

	recquire(opt.src, opt.exports, -opt.base, handler);

};


exports.include = include;
