

var test = function ( opt ) {

	var path = require('path');
	var argv = require('optimist').argv;
	var testrunner = require('qunit');
	var extend = require('node.extend');

	testrunner.options.maxBlockDuration = 20000 ;
	testrunner.options.coverage = true ;
	testrunner.options.log.tests = false ;
	testrunner.options.log.testing = false ;
	testrunner.options.log.assertions = false ;
	testrunner.options.log.summary = false ;

	if ( opt.babel ) testrunner.options.deps = __dirname + "/../../node_modules/babel-core/polyfill" ;

	extend( true , testrunner.options , opt.test ) ;

	var n = argv._.length || 1;
	var failed = 0;
	var done = 0;

	var cb = function(err, report) {
		if (err) {
			console.log('error : some weird error happened, the only clue we have is this error message -> ' + err.message);
			process.exit(-1);
		}

		failed += report.failed;
		++done;
		if (done === n) process.exit(failed);
	};

	var run = function(item) {
		testrunner.run(
			{
				code : {
					path : path.normalize(opt.code.main.join('/')),
					namespace : opt.name.replace( '-' , '' )
				},
				tests : opt.code.test.concat(item).join('/')
			}, cb
		);
	};


	var i;

	for (i = 0; i < argv._.length; ++i) {
		argv._[i] = ['src', argv._[i]+'.js'].join('/');
	}

	if (argv._.length === 0) argv._.push('index.js');

	for (i = 0; i < argv._.length; ++i) run(argv._[i]);
};

exports.test = test;
