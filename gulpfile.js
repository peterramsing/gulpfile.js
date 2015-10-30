var gulp         = require('gulp'),
	uglify       = require('gulp-uglify'),
	sass         = require('gulp-sass'),
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	notify       = require('gulp-notify');

var watch_paths = {
	scripts: ['assets/js/*.js'],
	styles:  ['assets/css/scss/**/*.scss']
};

// Scripts Task
gulp.task('scripts', function(){
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
gulp.task('styles', function(){
	gulp.src(watch_paths.styles)
	.pipe(plumber())
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(gulp.dest('assets/css'))
	.pipe(notify({ message: 'Styles task complete' }));
});

// Watch Task
gulp.task('watch', function(){
	gulp.watch(watch_paths.scripts, ['scripts']);
	gulp.watch(watch_paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);