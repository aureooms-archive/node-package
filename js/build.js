
var pkg = require('./src/build.js');
var ns  = require('./src/ns.js').ns;


var opt = {
	ns : ns,
	src : 'js/src/',
	out : 'js/dist/'
};

pkg.build(opt);