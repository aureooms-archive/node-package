#!/usr/bin/env node

var pkg = require('aureooms-node-package');
var ns = require('./js/index.js').ns;

var opt = {
	ns : ns,
	src : 'js/src/',
	out : 'js/dist/'
};

pkg.build(opt);
