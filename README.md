# [node-package](https://github.com/aureooms/node-package)

JavaScript code bricks package helpers as a npm module.

[![NPM license](http://img.shields.io/npm/l/aureooms-node-package.svg?style=flat)](https://raw.githubusercontent.com/aureooms/node-package/master/LICENSE)
[![NPM version](http://img.shields.io/npm/v/aureooms-node-package.svg?style=flat)](https://www.npmjs.org/package/aureooms-node-package)
[![Build Status](http://img.shields.io/travis/aureooms/node-package.svg?style=flat)](https://travis-ci.org/aureooms/node-package)
[![Coverage Status](http://img.shields.io/coveralls/aureooms/node-package.svg?style=flat)](https://coveralls.io/r/aureooms/node-package)
[![Dependencies Status](http://img.shields.io/david/aureooms/node-package.svg?style=flat)](https://david-dm.org/aureooms/node-package#info=dependencies)
[![devDependencies Status](http://img.shields.io/david/dev/aureooms/node-package.svg?style=flat)](https://david-dm.org/aureooms/node-package#info=devDependencies)
[![Code Climate](http://img.shields.io/codeclimate/github/aureooms/node-package.svg?style=flat)](https://codeclimate.com/github/aureooms/node-package)
[![NPM downloads per month](http://img.shields.io/npm/dm/aureooms-node-package.svg?style=flat)](https://www.npmjs.org/package/aureooms-node-package)
[![GitHub issues](http://img.shields.io/github/issues/aureooms/node-package.svg?style=flat)](https://github.com/aureooms/node-package/issues)

Used in [js-algo](https://github.com/aureooms/js-algo),
[js-data-structures](https://github.com/aureooms/js-data-structures)
and all their subpackages to handle building and testing.

Use together with [sak](https://github.com/aureooms/sak) to get
automated package creation as well as [duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower), and [npm](https://github.com/npm/npm)
registration and releases.

## Automated package creation and registration:

To run the following command you must:

  - install [npm](https://github.com/npm/npm)
  - install [bower](https://github.com/bower/bower)
  - install [sak](https://github.com/aureooms/sak)
  - log in for [npm](https://github.com/npm/npm) in the terminal

The following command will:

  1. Create a new directory named `js-<namespace>` in the current working
directory;
  2. Initialize a new git repository in this directory;
  3. Create a repository named `js-<namespace>` on [github.com](https://github.com) for `<username>`;
  4. **Add an AGPL LICENSE file to the repository**;
  5. Configure the local git repository with
`https://<username>@github.com/<username>/js-<namespace>`
as its origin remote;
  6. Create a [gh-pages branch](https://pages.github.com/) that will be populated by the `npm run doc` command
using [groc](https://github.com/nevir/groc);
  7. Create a `README.md` with badges;
  8. Create a configuration file for [travis-ci.org](https://travis-ci.org/) or [drone.io](https://drone.io/);
  9. Create a `pkg.json`, a `package.json`, a `bower.json` and a `component.json`;
  10. Register a package named `<username>-js-<namespace>` on npm and bower.

After running the command you will have to:

  1. Register the [github.com](https://github.com) repository on [travis-ci.org](https://travis-ci.org/) or [drone.io](https://drone.io/);
  2. Register the [github.com](https://github.com) repository on [codeclimate.com](https://codeclimate.com/);
  3. Register the [github.com](https://github.com) repository on [coveralls.io](https://coveralls.io/).

The [sak](https://github.com/aureooms/sak) **$** command to run is:

```sh
$ codebricks new <namespace> <description> --keywords <keyword>* --username <username> --ci (travis-ci|drone.io)
```

Or the shortened version of it:

```sh
$ cdb n <namespace> <description> -k <keyword>* -u <username> -c (travis-ci|drone.io)
```

Note that `--ci travis-ci` is the default. `--keywords` can be left empty.
If `--username` is not given then either [sak](https://github.com/aureooms/sak)
can find it in your `~/.sak` config file or will prompt for it.

## Automated releases

Release a major version for [duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower), and [npm](https://github.com/npm/npm):

```sh
$ npm release major
```

Release a minor version for [duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower), and [npm](https://github.com/npm/npm):

```sh
$ npm release minor
```

Release a patch version for [duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower), and [npm](https://github.com/npm/npm):

```sh
$ npm release patch
```

Release version [`<semver>`](http://semver.org/) for [duo](https://github.com/duojs/duo),
[component](https://github.com/componentjs/component),
[bower](https://github.com/bower/bower), and [npm](https://github.com/npm/npm):

```sh
$ npm release <semver>
```

Note that `$ npm release <...>` can be shortened to `$ npm r <...>`.


## How does the doc, build and test commands work:

Running the package creation command explained earlier will install
`aureooms-node-package` as a development dependency of your package. This is
equivalent to running:

```sh
npm install --save-dev aureooms-node-package
```

This will give your project access to tree runnables located in
`node_modules/.bin`. The package creation command will add these scripts to
your `package.json`:

```json
...
"scripts": {
	"doc": "./node_modules/.bin/groc",
	"build": "./node_modules/.bin/aureooms-node-package-build",
	"test": "./node_modules/.bin/aureooms-node-package-test"
},
...
```

It will also create a `pkg.json` file, assuming your code tree is located in
`js/src` and your testing `index.js` is located in `test/js`:

```json
{
	"name": "{namespace}",
	"code": {
		"main": [ "js", "dist", "<namespace>.js" ],
		"test": [ "test", "js" ]
	},
	"debug": false,
	"src": "js/src/",
	"out": "js/dist/"
}
```

Running `npm run build` will parse your code tree recursively and in
lexicographical order, concatenating all the files it encounters in
`js/dist/<namespace>.js` and minify this file to `js/dist/<namespace>.min.js`.

Running `npm run doc` will generate the documentation using
[groc](https://github.com/nevir/groc) and publish it on
[github.com](https://github.com/) ([gh-pages branch](https://pages.github.com/)). Before running this command you must make
sure to have committed all your local changes.

Running `npm run test` will test the main code file using the test code
referenced by `test/js/index.js`.
