/// <reference path="typings/node/node.d.ts"/>
var gulp = require('gulp'),
    browserify = require('browserify'),
    ngAnno = require('gulp-ng-annotate'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlify = require('gulp-angular-htmlify'),
    htmlmin = require('gulp-htmlmin'),
    gutil = require('gulp-util'),
    es = require('event-stream'),
    path = require('path'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    jsonlint = require('gulp-json-lint'),
    htmlJsStr = require('js-string-escape'),
    through = require('through2'),
    Readable = require('stream').Readable || require('readable-stream');

var cacheGen = function(filename, options) {
	var TEMPLATE_HEADER = '(function(){\'use strict\';angular.module(\'<%= module %>\'<%= standalone %>).run([\'<%= cache %>\', function(<%= cache %>) {',
	    TEMPLATE_FOOTER = '}]);})();',
	    DEFAULT_FILENAME = 'cacheGen.js',
	    DEFAULT_MODULE = 'cacheGen',
	    DEFAULT_CACHE = '$templateCache',
	    DEFAULT_TRANSFORM = function(contents) { return contents; },
	    MODULE_TEMPLATES = {
		requirejs: {
			header: 'define([\'angular\'], function(angular) { \'use strict\'; return ',
			footer: '});'
		},
		browserify: {
			header: '\'use strict\'; module.exports = '
		}
	};

	function cacheGenFiles(root, base, cache, transform) {
		return function cacheGenFile(file, callback) {
			var template = '<%= cache %>.put(\'<%= url %>\',\'<%= contents %>\');',
			    url;

			file.path = path.normalize(file.path);
			if (typeof base === 'function') {
				url = path.join(root, base(file));
			} else {
				url = path.join(root, file.path.replace(base || file.base, ''));
			} //end if
			if (process.platform === 'win32') {
				url = url.replace(/\\/g, '/');
			} //end if
			file.contents = new Buffer(gutil.template(template, {
				url: url,
				contents: transform(file.contents),
				cache: cache,
				file: file
			}));
			callback(null, file);
		}; //end cacheGenFile()
	} //end cacheGenFiles()

	function cacheGenStream(root, base, cache, transform) {
		if (typeof base !== 'function' && base && base.substr(-1) !== path.sep) {
			base += path.sep;
		} //end if
		return es.map(cacheGenFiles(root, base, cache, transform));
	} //end cacheGenStream()

	function wrapInModule(moduleSystem) {
		var moduleTemplate = MODULE_TEMPLATES[moduleSystem];

		if (!moduleTemplate) {
			return gutil.noop();
		} //end if
		return es.pipeline(
			header(moduleTemplate.header || ''),
			footer(moduleTemplate.footer || '')
		);
	} //end wrapInModule()

	if (typeof filename === 'string') {
		options = options || {};
	} else {
		options = filename || {};
		filename = options.filename || DEFAULT_FILENAME;
	} //end if
	if (options.moduleSystem) {
		options.moduleSystem = options.moduleSystem.toLowerCase();
	} //end if

   // Intermediate variable declaration before the return statement.
   // If there were options to specify overrides, then use those options;
   // otherwise, use the defaults
	var templateHeader = options.templateHeader || TEMPLATE_HEADER,
	    templateFooter = options.templateFooter || TEMPLATE_FOOTER,
	    cacheProvider = options.cache || DEFAULT_CACHE,
	    contentTransform = options.transform || DEFAULT_TRANSFORM;

	return es.pipeline(
		cacheGenStream(options.root || '', options.base, cacheProvider, contentTransform),
		concat(filename),
		header(templateHeader, {
			module: options.module || DEFAULT_MODULE,
			standalone: options.standalone ? ', []' : '',
			cache: cacheProvider
		}),
		footer(templateFooter),
		wrapInModule(options.moduleSystem)
	);
}; //end cacheGen()

var browserified = function(opts, data) {
	// prevent the parameters from defaulting to undefined, allow
	// the variables to be empty objects instead
	opts = opts || {};
	data = data || {};
	
	function arrayStream(items) {
		var index = 0;
		var readable = new Readable({ objectMode: true });
		readable._read = function() {
			if (index < items.length) {
				readable.push(items[index]);
				index++;
			} else {
				readable.push(null);
			} //end if
		};
		return readable;
	} //end arrayStream()

	['noParse', 'extensions', 'resolve'].forEach(function(opt) {
		if(opts[opt]) {
			data[opt] = opts[opt];
			delete opts[opt];
		} //end if
	});

	function transform(file, enc, cb) {
		var self = this;

		if (file.isStream()) {
			return cb();
		} //end if
		if (file.isNull()) {
			data.entries = file.path;
		} //end if
		if (file.isBuffer()) {
			data.entries = arrayStream([file.contents]);
		} //end if
		data.basedir = path.dirname(file.path);

		// Intermediate variable declaration based upon
		// the data sent into the tramsform via the opened
		// file.
		var bundler = browserify(data, opts);

		if (opts.shim) {
			for (var lib in opts.shim) {
				opts.shim[lib].path = path.resolve(opts.shim[lib].path);
			} //end for
			bundler = shim(bundler, opts.shim);
		} //end if
		bundler.on('error', function(err) {
			self.emit('error');
			cb();
		});
		[
			'exclude',
			'add',
			'external',
			'transform',
			'ignore',
			'require'
		].forEach(function(method) {
			if (!opts[method]) return;
			[].concat(opts[method]).forEach(function(args) {
				bundler[method].apply(bundler, [].concat(args));
			});
		});
		self.emit('prebundle', bundler);
		
		//buffer stream
		bundler.bundle(function(err, src) {
			if (err) {
				self.emit('error');
			} else {
				self.emit('postbundle', src);

				file.contents = new Buffer(src);
				self.push(file);
			} //end if
			cb();
		});
	} //end transform()
	return through.obj(transform);
}; //end browserified()

gulp.task('scripts', function() {
	var views = gulp
	  .src('app/views/**/*.html')
    .pipe(htmlify())
    .pipe(htmlmin({
    	collapseBooleanAttributes:     true,
    	collapseWhitespace:            true,
    	removeAttributeQuotes:         true,
    	removeComments:                true,
    	removeEmptyAttributes:         true,
    	removeRedundantAttributes:     true,
    	removeScriptTypeAttributes:    true,
    	removeStyleLinkTypeAttributes: true
			}))
			.pipe(cacheGen('templates.js', {
				cache: '$templateCache',
				transform: function(contents) {
					return htmlJsStr(contents);
				},
      	root: 'views',
      	module: 'dinka'
      }));
			
	views.on('data', function(chunk) {
		var contents = chunk.contents.toString().trim(),
		    bufLength = process.stdout.columns,
		    hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
			
		if (contents.length > 1) {
			process.stdout.write('Views: ' + chunk.path + '\n');
		} //end if
	});

    // Intermediate variable declarations for acquiring the translation
	// files
	var translations = gulp
	  .src('app/i18n/**/*.json')
	  .pipe(jsonlint())
	  .pipe(cacheGen('translations.js', {
		cache: '$translationCache',
		transform: function(contents) {
			contents = contents.toString() === '' ? new Buffer('{}') : contents;
			return JSON.stringify(JSON.parse(contents));
		},
		root: 'i18n',
		module: 'dinka'
	  }));

	translations.on('data', function(chunk) {
      var contents = chunk.contents.toString().trim(),
          bufLength = process.stdout.columns,
          hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
		  
      if (contents.length > 1) {
        process.stdout.write('Translations: ' + chunk.path + '\n');
      } //end if
    });

    // Intermediate variable declaration for acquiring the scripts
	var scripts = gulp.src(['app/scripts/**/*.js', '!app/scripts/util/jwt.bundle.js']);

	scripts.on('data', function(chunk) {
      var contents = chunk.contents.toString().trim(),
          bufLength = process.stdout.columns,
          hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
		  
      if (contents.length > 1) {
        process.stdout.write('Scripts: ' + chunk.path + '\n');
      } //end if
    });

	var combined = es
	  .merge(views, translations, scripts)
	  .pipe(ngAnno())
	  .pipe(jshint())
	  .pipe(jshint.reporter('jshint-stylish'))
	  .pipe(concat('bundle.js'))
	  .pipe(browserified())
	  .pipe(uglify())
	  .pipe(gulp.dest('dist/scripts'));

	combined
	  .on('data', function(chunk) {
        var contents = chunk.contents.toString().trim(),
            bufLength = process.stdout.columns,
            hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
			
	    if (contents.length > 1) {
          process.stdout.write('Combined: ' + chunk.path + '\n');
	    } //end if
      });
	return combined;
});

gulp.task('manifest', function() {
  return gulp
    .src('app/manifest.json')
	  .pipe(gulp.dest('dist'));
});

gulp.task('background', function() {
  return gulp
    .src('app/background.js')
		.pipe(jshint())
	  .pipe(jshint.reporter('jshint-stylish'))
	  .pipe(uglify())
	  .pipe(gulp.dest('dist'));
});

gulp.task('sightcall_webview', function() {
  return gulp
    .src('app/sightcall/call.html')
	  .pipe(htmlmin({
	  collapseBooleanAttributes:     true,
	  collapseWhitespace:            true,
	  removeAttributeQuotes:         true,
	  removeComments:                true,
	  removeEmptyAttributes:         true,
	  removeRedundantAttributes:     true,
	  removeScriptTypeAttributes:    true,
	  removeStyleLinkTypeAttributes: true
	}))
	.pipe(gulp.dest('dist/sightcall'));
});

gulp.task('sightcall_script', function() {
  return gulp
    .src('app/sightcall/call.js')
	  .pipe(jshint())
	  .pipe(jshint.reporter('jshint-stylish'))
	  .pipe(uglify())
	  .pipe(gulp.dest('dist/sightcall'));
});

gulp.task('default', [
	'scripts',
	'manifest',
	'background',
	'sightcall_webview',
	'sightcall_script']);
