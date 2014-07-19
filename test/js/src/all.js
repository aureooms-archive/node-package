

test(pkg.ns, function(){

	ok(pkg.build != undefined, 'build defined');
	ok(pkg.include != undefined, 'include defined');
	ok(pkg.test != undefined, 'test defined');
	ok(pkg.ns != undefined, 'ns defined');

});