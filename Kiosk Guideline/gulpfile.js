var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var vtransform = require('vinyl-transform');
var sourcemaps = require('gulp-sourcemaps');
var ngAnno = require('gulp-ng-annotate');
var usemin = require('gulp-usemin');
var wiredep = require('wiredep');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var htmlify = require('gulp-angular-htmlify');
var htmlmin = require('gulp-htmlmin');
var gutil = require('gulp-util');
var del = require('del');
var es = require('event-stream');
var path = require('path');
var header = require('gulp-header');
var footer = require('gulp-footer');
var jsonlint = require('gulp-json-lint');
var htmlJsStr = require('js-string-escape');
var through = require('through2');
var Readable = require('stream').Readable || require('readable-stream');

var cacheGen = function(filename, options) {
	var TEMPLATE_HEADER = '(function(){\'use strict\';angular.module(\'<%= module %>\'<%= standalone %>).run([\'<%= cache %>\', function(<%= cache %>) {';
	var TEMPLATE_FOOTER = '}]);})();';
	var DEFAULT_FILENAME = 'cacheGen.js';
	var DEFAULT_MODULE = 'cacheGen';
	var DEFAULT_CACHE = '$templateCache';
	var DEFAULT_TRANSFORM = function(contents) { return contents; };
	var MODULE_TEMPLATES = {
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
			var template = '<%= cache %>.put(\'<%= url %>\',\'<%= contents %>\');';
			var url;

			file.path = path.normalize(file.path);

			if (typeof base === 'function') {
				url = path.join(root, base(file));
			} else {
				url = path.join(root, file.path.replace(base || file.base, ''));
			}

			if (process.platform === 'win32') {
				url = url.replace(/\\/g, '/');
			}

			file.contents = new Buffer(gutil.template(template, {
				url: url,
				contents: transform(file.contents),
				cache: cache,
				file: file
			}));

			callback(null, file);
		};
	}

	function cacheGenStream(root, base, cache, transform) {
		if (typeof base !== 'function' && base && base.substr(-1) !== path.sep) {
			base += path.sep;
		}

		return es.map(cacheGenFiles(root, base, cache, transform));
	}

	function wrapInModule(moduleSystem) {
		var moduleTemplate = MODULE_TEMPLATES[moduleSystem];

		if (!moduleTemplate) {
			return gutil.noop();
		}

		return es.pipeline(
			header(moduleTemplate.header || ''),
			footer(moduleTemplate.footer || '')
		);
	}

	if (typeof filename === 'string') {
		options = options || {};
	} else {
		options = filename || {};
		filename = options.filename || DEFAULT_FILENAME;
	}

	if (options.moduleSystem) {
		options.moduleSystem = options.moduleSystem.toLowerCase();
	}

	var templateHeader = options.templateHeader || TEMPLATE_HEADER;
	var templateFooter = options.templateFooter || TEMPLATE_FOOTER;
	var cacheProvider = options.cache || DEFAULT_CACHE;
	var contentTransform = options.transform || DEFAULT_TRANSFORM;

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
};

var browserified = function(opts, data) {
	function arrayStream(items) {
		var index = 0;
		var readable = new Readable({ objectMode: true });
		readable._read = function() {
			if (index < items.length) {
				readable.push(items[index]);
				index++;
			} else {
				readable.push(null);
			}
		};
		return readable;
	}

	opts = opts || {};
	data = data || {};

	['noParse', 'extensions', 'resolve'].forEach(function(opt) {
		if(opts[opt]) {
			data[opt] = opts[opt];
			delete opts[opt];
		}
	});

	function transform(file, enc, cb) {
		var self = this;

		if (file.isStream()) {
			return cb();
		}

		if (file.isNull()) {
			data.entries = file.path;
		}

		if (file.isBuffer()) {
			data.entries = arrayStream([file.contents]);
		}

		data.basedir = path.dirname(file.path);

		//

		var bundler = browserify(data, opts);

		if (opts.shim) {
			for (var lib in opts.shim) {
				opts.shim[lib].path = path.resolve(opts.shim[lib].path);
			}

			bundler = shim(bundler, opts.shim);
		}

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

		var bStream = bundler.bundle(function(err, src) {
			if (err) {
				self.emit('error');
			} else {
				self.emit('postbundle', src);

				file.contents = new Buffer(src);
				self.push(file);
			}

			cb();
		});
	}

	return through.obj(transform);
};
gulp.task('scripts', function() {
	var views = gulp.src('app/views/**/*.html')
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
			})).pipe(cacheGen('templates.js', {
				cache: '$templateCache',
				transform: function(contents) {
					return htmlJsStr(contents);
				},
	                	root: 'views',
	                	module: 'dinka'
	                }));
	views.on('data', function(chunk) {
		var contents = chunk.contents.toString().trim();
		var bufLength = process.stdout.columns;
		var hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
		if (contents.length > 1) {
			process.stdout.write('Views: ' + chunk.path + '\n');// + '\n' + contents + '\n');
			//process.stdout.write(chunk.path + hr);
		}
	});

	var translations = gulp.src('app/i18n/**/*.json')
	                       .pipe(jsonlint())
	                       //.pipe(jsonlint.report('verbose'))
	                       .pipe(cacheGen('translations.js', {
					cache: '$translationCache',
					transform: function(contents) {
						contents = contents.toString() === '' ? new Buffer('{}') : contents;
						return JSON.stringify(JSON.parse(contents));
					},
					root: 'i18n',
					module: 'dinka'
				}));
	                        //.pipe(gulp.dest('gulp_dist/scripts/i18n.js'));

	translations.on('data', function(chunk) {
                var contents = chunk.contents.toString().trim();
                var bufLength = process.stdout.columns;
                var hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
                if (contents.length > 1) {
                        process.stdout.write('Translations: ' + chunk.path + '\n');// + '\n' + contents + '\n');
                        //process.stdout.write(chunk.path + hr);
                }
        });

	var scripts = gulp.src(['app/scripts/**/*.js', '!app/scripts/util/jwt.bundle.js']);

	scripts.on('data', function(chunk) {
                var contents = chunk.contents.toString().trim();
                var bufLength = process.stdout.columns;
                var hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
                if (contents.length > 1) {
                        process.stdout.write('Scripts: ' + chunk.path + '\n');// + '\n' + contents + '\n');
                        //process.stdout.write(chunk.path + hr);
                }
        });

	//var browserified = vtransform(function(filename) {
	//	var b = browserify(filename);
	//	return b.bundle();
	//});

	var combined = es
			  .merge(views, translations, scripts)
			  .pipe(ngAnno())
			  .pipe(jshint())
			  .pipe(jshint.reporter('jshint-stylish'))
			  .pipe(concat('bundle.js'))
			  .pipe(browserified())
			  //.pipe(uglify())
	         .pipe(gulp.dest('gulp_dist/scripts'));

	combined.on('data', function(chunk) {
                var contents = chunk.contents.toString().trim();
                var bufLength = process.stdout.columns;
                var hr = '\n\n' + Array(bufLength).join('_') + '\n\n';
                if (contents.length > 1) {
                        process.stdout.write('Combined: ' + chunk.path + '\n');// + '\n' + contents + '\n');
                        //process.stdout.write(chunk.path + hr);
                }
        });
	return combined;
/**
	var one = es.merge(views,translations,scripts).pipe(ngAnno()); one.on('data',function(chunk){process.stdout.write('One: '+chunk.path+'\n');});
	var two = one.pipe(jshint()); two.on('data',function(chunk){process.stdout.write('Two: '+chunk.path+'\n');});
	var three = two.pipe(concat('bundle.js')); three.on('data',function(chunk){process.stdout.write('Three: '+chunk.path+'\n');});
	var four = three.pipe(browserified()); four.on('data',function(chunk){process.stdout.write('Four: '+chunk.path+'\n');});
	var five = four.pipe(uglify()); five.on('data',function(chunk){process.stdout.write('Five: '+chunk.path+'\n');});
	var six = five.pipe(gulp.dest('gulp_dist/scripts')); six.on('data',function(chunk){process.stdout.write('Six: '+chunk.path+'\n');});
	return six;
**/

//	var bundler = browserify({
//		entries: ['app/scripts/browserify.js']
//	});

//	var bundle = function() {
//		return bundler.bundle()
//		              .pipe(source(getBundleName() + '.js'))
//	};

//	var scripts = gulp.src('app/scripts/**/*.js')
//		.pipe(
//
//		.pipe(gulp.dest('dist/dev/scripts')
//		.pipe(uglify())
//		.pipe(rename({ extname: '.min.js' }))
//		.pipe(gulp.dest('dist/dev/scripts');/
});

gulp.task('index', function() {
	gulp.src('/app/scripts/**/*.js')
		.pipe(wiredep({
			
		})).pipe(gul.dest());
});

gulp.task('manifest', function() {
	return gulp.src('app/manifest.json')
		.pipe(gulp.dest('gulp_dist'));
});

gulp.task('background', function() {
	return gulp.src('app/scripts/background.js')
		.pipe(uglify())
		.pipe(gulp.dest('gulp_dist/scripts'));
});

gulp.task('sightcall_webview', function() {
	return gulp.src('app/sightcall/call.html')
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
		.pipe(gulp.dest('gulp_dist/sightcall'));
});

gulp.task('sightcall_script', function() {
	return gulp.src('app/sightcall/call.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(uglify())
		.pipe(gulp.dest('gulp_dist/sightcall'));
});



gulp.task('stuff', function () {
	// var viewsStream = gulp.src('app/views/**/*.html'),
	//     scriptsStream = gulp.src('app/scripts/**/*.js');
	// viewsStream
	// 	.pipe(htmlify())
	// 	.pipe(htmlmin({
	// 		collapseBooleanAttributes: true,
	// 		collapseWhitespace: true,
	// 		removeAttributeQuotes: true,
	// 		removeComments: true,
	// 		removeEmptyAttributes: true,
	// 		removeRedundantAttributes: true,
	// 		removeScriptTypeAttributes: true,
	// 		removeStyleLinkTypeAttributes: true
	// 	})).pipe(templateCache({
	// 		root: 'views',
	// 		module: 'dinka'
	// 	}));
});
gulp.task('default', [
	'scripts',
	'manifest',
	'background',
	'sightcall_webview',
	'sightcall_script']);