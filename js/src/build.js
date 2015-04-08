

var build = function(opt){

	var fs = require('fs');
	var util = require('util');
	var fmt = util.format;
	var recbuild_t = require('aureooms-node-recursive-build');
	var UglifyJS = require('uglify-js');
	var babel = require('babel-core');
	var extend = require('node.extend');

	var dflt = {
		name : undefined,
		src  : undefined,
		out  : undefined,
		base : 0,
		rec  : false,
		flat : true,
		babel: false
	};

	opt = extend({}, dflt, opt);

	var namespace = opt.name.replace( '-' , '' ) ;

	var recbuild = recbuild_t({
		name : namespace ,
		rec  : opt.rec ,
		flat : opt.flat
	});

	if (!fs.existsSync(opt.out)) fs.mkdirSync(opt.out);

	var fd,
	    base = fmt('%s/%s%%s', opt.out, opt.name),
	    concat = fmt(base, '.js'),
	    min = fmt(base, '.min.js'),
	    map = fmt(base, '.js.map');

	var fhandle = function(f) {
		var raw = fs.readFileSync(f);
		fs.writeSync(fd, raw.toString());
		fs.writeSync(fd, '\n');
	};

	var rhandle = function(raw) {
		fs.writeSync(fd, raw);
		fs.writeSync(fd, '\n');
	};

	fd = fs.openSync(concat, 'w');
	recbuild(opt.src, namespace, -opt.base, fhandle, rhandle);
	fs.closeSync(fd);

	if ( opt.babel ) {

		var es5 = babel.transformFileSync( concat ) ;

		fd = fs.openSync( concat , 'w' ) ;

		fs.writeSync( fd , es5.code ) ;

		fs.closeSync( fd ) ;

	}

	var minified = UglifyJS.minify(concat, { outSourceMap: map });

	fs.writeFileSync(min, minified.code);
	fs.writeFileSync(map, minified.map);

};

exports.build = build;
