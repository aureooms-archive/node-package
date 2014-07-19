
var pkg = require('src/include.js');
var ns  = require('src/ns.js').ns;


var opt = {
	ns      : ns,
	src     : 'src',
	exports : module.exports,
	base    : 0
};

pkg.include(opt);