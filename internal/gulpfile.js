'use strict'

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var Task = {
	buildStyles: 'Compiling scss',
	buildJavascript: 'Compiling js'
};

var paths = {
	scss: {
		source: ['./src/scss/*.scss', './src/scss/**/*.scss'],
		destination: '../dist/styles/'
	},
	js: {
		source: ['./src/js/*.js', './src/js/**/*.js'],
		destination: '../dist/scripts/'
	},
	modules: {
		// bootsrap: ['node_modules/bootstrap-sass/assets/stylesheets']
	}
};

gulp.task(Task.buildStyles, function() {
	plugins.util.log(plugins.util.colors.blue('Running scss through build'));
	gulp.src(paths.scss.source)
		.pipe(plugins.plumber())
		.pipe(plugins.sass({
			outputStyle: 'compressed'
			// includePaths: paths.modules.bootsrap
		}))
		.on('error', plugins.sass.logError)
		.pipe(plugins.rename('home.built.css'))
		.pipe(gulp.dest(paths.scss.destination));
});

gulp.task(Task.buildJavascript, function() {
	plugins.util.log(plugins.util.colors.blue('Running js through build'));
	gulp.src(paths.js.source)
		.pipe(plugins.plumber())
		.pipe(plugins.browserify({
			insertGlobals: true,
			debug: true
		}))
		.pipe(plugins.uglify())
		.pipe(plugins.rename('home.built.js'))
		.pipe(gulp.dest(paths.js.destination));
});

gulp.task('default', [Task.buildStyles, Task.buildJavascript], function() {
	plugins.util.log(plugins.util.colors.green('Looks like we made it without errors'));
});

gulp.task('watch', function() {
	plugins.util.log(plugins.util.colors.green('And now your watch begins'));
	gulp.watch(paths.scss.source, [Task.buildStyles]);
	gulp.watch(paths.js.source, [Task.buildJavascript]);
});
