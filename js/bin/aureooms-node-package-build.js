#!/usr/bin/env node

var pkg = require('aureooms-node-package');
var fs  = require('fs');

var config = pkg.config;

var data = fs.readFileSync(config, 'utf8');
var opt = JSON.parse(data);

var npmconfig = JSON.parse( fs.readFileSync("package.json", "utf8") );
opt.fullname = npmconfig.name ;

pkg.build(opt);
