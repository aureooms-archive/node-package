

var list = function(opt){

	var actions = [];
	var handler = function(){ actions.push(arguments); };
	include(opt, handler);
	return actions;

};


exports.list = list;