#!/usr/bin/env node

var pkg = require('aureooms-node-package');
var ns = require('./js/index.js').ns;

pkg.test(ns, ['js', 'dist', ns + '.js'], ['test', 'js']);