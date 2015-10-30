var gulp         = require('gulp'),
	uglify       = require('gulp-uglify'),
	sass         = require('gulp-sass'),
	rename       = require('gulp-rename'),
	notify       = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer');

var watch_paths = {
	scripts: ['assets/js/libs/*.js'],
	styles:  ['assets/css/scss/**/*.scss']
};

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

// Scripts Task
gulp.task('scripts', function(){
	gulp.src(watch_paths.scripts)
	.pipe(rename({
        suffix: '.min'
    }))
	.pipe(uglify())
	.on('error', errorLog)
	.pipe(gulp.dest('assets/js'))
	.pipe(notify({ message: 'Scripts task complete' }));
});

// Styles Task
gulp.task('styles', function(){
	gulp.src(watch_paths.styles)
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.on('error', errorLog)
	.pipe(gulp.dest('assets/css'))
	.pipe(notify({ message: 'Styles task complete' }));
});

// Watch Task
gulp.task('watch', function(){
	gulp.watch(watch_paths.scripts, ['scripts']);
	gulp.watch(watch_paths.styles, ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);