var gulp         = require('gulp'),
	uglify       = require('gulp-uglify'),
	sass         = require('gulp-sass'),
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	prefix       = require('gulp-autoprefixer'),
	notify       = require('gulp-notify'),
	jade		 = require('gulp-jade');

var watch_paths = {
	jade:    ['**/*.jade'],
	scripts: ['assets/js/*.js'],
	styles:  ['assets/css/scss/**/*.scss']
};

// Scripts Task
gulp.task('scripts', function() {
	gulp.src(watch_paths.scripts)
		.pipe(plumber())
		.pipe(rename({
        	suffix: '.min'
    	}))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

// Styles Task
gulp.task('styles', function() {
	gulp.src(watch_paths.styles)
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('assets/css'))
		.pipe(notify({ message: 'Styles task complete' }));
});

// Jade Task
gulp.task('jade', function() {
	gulp.src(watch_paths.jade)
		.pipe(jade({
	    	pretty: true
	    }))
		.pipe(gulp.dest('docs'));
});

// Watch Task
gulp.task('watch', function() {
	gulp.watch(watch_paths.scripts, ['scripts']);
	gulp.watch(watch_paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);