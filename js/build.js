
var pkg = require('./index.js');
var fs  = require('fs');

var config = pkg.config;

var data = fs.readFileSync(config, 'utf8');
var opt = JSON.parse(data);

pkg.build(opt);