var pkg = require('src/build.js');
var ns  = require('src/ns.js').ns;


var opt = {
	ns : ns,
	src : __dirname + '/src/',
	out : __dirname + '/dist/'
};

pkg.build(opt);