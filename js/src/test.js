

var test = function(ns, codepath, testpath){

	var path = require('path');
	var argv = require('optimist').argv;
	var testrunner = require('qunit');

	testrunner.options.maxBlockDuration = 20000;
	testrunner.options.coverage = true;
	testrunner.options.log.tests = false;
	testrunner.options.log.testing = false;
	testrunner.options.log.assertions = false;
	testrunner.options.log.summary = false;

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
					path : path.normalize(codepath.join('/')),
					namespace: ns
				},
				tests : testpath.concat(item).join('/')
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
