#!/usr/bin/env node

var pkg = require('aureooms-node-package');
var fs  = require('fs');

var config = pkg.config;

var data = fs.readFileSync(config, 'utf8');
var opt = JSON.parse(data);

var rc = pkg.test(opt.ns, opt.code.main, opt.code.test);
if (rc) console.log('error : exiting with error code #' + rc);
process.exit(rc);