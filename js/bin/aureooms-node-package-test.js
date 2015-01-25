#!/usr/bin/env node

var pkg = require('aureooms-node-package');
var fs  = require('fs');

var config = pkg.config;

var data = fs.readFileSync(config, 'utf8');
var opt = JSON.parse(data);

pkg.test(opt.name, opt.code.main, opt.code.test);
