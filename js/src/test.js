

var test = function(ns, codepath, testpath){

	var path = require('path');
	var argv = require('optimist').argv;
	var testrunner = require('qunit');
	
	testrunner.options.coverage = true;
	testrunner.options.log.tests = false;
	testrunner.options.log.testing = false;
	testrunner.options.log.assertions = false;
	testrunner.options.log.summary = false;

	var cb = function(err, report) {
		// console.dir(report);
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


	for (var i = 0; i < argv._.length; ++i) {
		argv._[i] = ['src', argv._[i]+'.js'].join('/');
	}

	if (argv._.length === 0) argv._.push('index.js');

	for (var i = 0; i < argv._.length; ++i) run(argv._[i]);
};

exports.test = test;