'use strict';

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/build.js */

		var build = function build(opt) {

			var fs = require('fs');
			var util = require('util');
			var fmt = util.format;
			var recbuild_t = require('aureooms-node-recursive-build');
			var UglifyJS = require('uglify-js');
			var babel = require('babel-core');
			var extend = require('node.extend');
			var path = require('path');

			var dflt = {
				fullname: undefined,
				name: undefined,
				src: undefined,
				out: undefined,
				base: 0,
				rec: false,
				flat: true,
				babel: false
			};

			opt = extend({}, dflt, opt);

			var namespace = opt.name.replace(/-/g, '');

			var recbuild = recbuild_t({
				fullname: opt.fullname,
				name: namespace,
				rec: opt.rec,
				flat: opt.flat
			});

			if (!fs.existsSync(opt.out)) fs.mkdirSync(opt.out);

			var fd,
			    base = fmt('%s/%s%%s', opt.out, opt.name),
			    concat = path.normalize(fmt(base, '.js')),
			    min = path.normalize(fmt(base, '.min.js')),
			    map = path.normalize(fmt(base, '.js.map'));

			var fhandle = function fhandle(f) {
				var raw = fs.readFileSync(f);
				fs.writeSync(fd, raw.toString());
				fs.writeSync(fd, '\n');
			};

			var rhandle = function rhandle(raw) {
				fs.writeSync(fd, raw);
				fs.writeSync(fd, '\n');
			};

			fd = fs.openSync(concat, 'w');
			recbuild(opt.src, namespace, -opt.base, fhandle, rhandle);
			fs.closeSync(fd);

			if (opt.babel) {

				if (opt.babel === true) opt.babel = {};

				var es5 = babel.transformFileSync(concat, opt.babel);

				fd = fs.openSync(concat, 'w');

				fs.writeSync(fd, es5.code);

				fs.closeSync(fd);
			}

			var minified = UglifyJS.minify(concat, { outSourceMap: map });

			fs.writeFileSync(min, minified.code);
			fs.writeFileSync(map, minified.map);
		};

		exports.build = build;

		/* js/src/config.js */

		exports.config = 'pkg.json';

		/* js/src/include.js */

		var include = function include(opt, handler) {

			var recquire_t = require('aureooms-node-recursive-require');
			var extend = require('node.extend');

			var dflt = {
				name: undefined,
				src: undefined,
				exports: undefined,
				base: 0,
				index: 'index.js',
				intro: 'intro.js',
				outro: 'outro.js',
				rec: false,
				flat: true,
				debug: false
			};

			opt = extend({}, dflt, opt);

			if (opt.name) opt.name = opt.name.replace(/-/g, '');

			var recquire = recquire_t(opt);

			recquire(opt.src, opt.exports, -opt.base, handler);
		};

		exports.include = include;

		/* js/src/list.js */

		var list = function list(opt) {

			var actions = [];
			var handler = function handler() {
				actions.push(arguments);
			};
			include(opt, handler);
			return actions;
		};

		exports.list = list;
		/* js/src/test.js */

		var test = function test(opt) {

			var path = require('path');
			var argv = require('optimist').argv;
			var testrunner = require('qunit');
			var extend = require('node.extend');

			testrunner.options.maxBlockDuration = 20000;
			testrunner.options.coverage = true;
			testrunner.options.log.tests = false;
			testrunner.options.log.testing = false;
			testrunner.options.log.assertions = false;
			testrunner.options.log.summary = false;

			if (opt.babel) testrunner.options.deps = __dirname + "/../../node_modules/babel-core/polyfill";

			extend(true, testrunner.options, opt.test);

			var n = argv._.length || 1;
			var failed = 0;
			var done = 0;

			var cb = function cb(err, report) {
				if (err) {
					console.log('error : some weird error happened, the only clue we have is this error message -> ' + err.message);
					process.exit(-1);
				}

				failed += report.failed;
				++done;
				if (done === n) process.exit(failed);
			};

			var run = function run(item) {
				testrunner.run({
					code: {
						path: path.normalize(opt.code.main.join('/')),
						namespace: opt.name.replace(/-/g, '')
					},
					tests: opt.code.test.concat(item).join('/')
				}, cb);
			};

			var i;

			for (i = 0; i < argv._.length; ++i) {
				argv._[i] = ['src', argv._[i] + '.js'].join('/');
			}

			if (argv._.length === 0) argv._.push('index.js');

			for (i = 0; i < argv._.length; ++i) run(argv._[i]);
		};

		exports.test = test;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-node-package", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["pkg"] = {});
	} else console.error("unable to detect type of module to define for aureooms-node-package");
})();