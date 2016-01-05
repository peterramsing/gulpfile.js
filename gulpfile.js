var gulp         = require('gulp'),
	postcss 	 = require('gulp-postcss'),
	uglify       = require('gulp-uglify'),
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	autoprefixer = require('autoprefixer'),
	notify       = require('gulp-notify'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync');
	//lost         = require('lost');

var watch_paths = {
	scripts: ['assets/js/*.js'],
	styles:  ['assets/css/scss/*.scss']
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
	var processors = [
		//lost,
		autoprefixer({browsers:['last 2 version']})
	];

	gulp.src(watch_paths.styles)
		.pipe(postcss(processors))
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest('assets/css'))
		.pipe(notify({ message: 'Styles task complete' }))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('styles-watch', ['styles'], browserSync.reload);

// Watch Task
gulp.task('watch', function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});
	gulp.watch(watch_paths.scripts, ['scripts']);
	gulp.watch(watch_paths.styles, ['styles-watch']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);