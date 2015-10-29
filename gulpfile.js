var gulp   = require('gulp'),
	uglify = require('gulp-uglify'),
	sass   = require('gulp-ruby-sass');

function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}

// Scripts Task
gulp.task('scripts', function(){
	gulp.src('js/*.js')
		.pipe(uglify())
		.on('error', errorLog)
		.pipe(gulp.dest('js/min'));
});

// Styles Task
gulp.task('styles', function(){
	gulp.task('scss/**/*.scss')
		.pipe(sass({
			style: 'compressed'
		}))
		.on('error', errorLog)
	.pipe(gulp.dest('css/'));
});

// Watch Task
gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('scss/**/*.scss', ['styles']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);