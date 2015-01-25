
var include = require('./src/include.js').include;
var config = require('./src/config.js').config;

var fs  = require('fs');
var data = fs.readFileSync(config, 'utf8');
var opt = JSON.parse(data);


var opt = {
	name      : opt.name,
	src     : __dirname + '/src/',
	exports : module.exports,
	base    : 0
};

include(opt);
