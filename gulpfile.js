var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync  = require('browser-sync');

// Compress files
gulp.task('compress', function() {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/dist'));
});
//  Run server and Sync browser
gulp.task('browser-sync', function() {
  browserSync.init([ 'assets/js/', 'index.html'], {
    server: {
      baseDir: './'
    }
  });
});

//  Default task
gulp.task('default', ['compress', 'browser-sync'], function() {
  gulp.watch('assets/js/main.js', ['compress']);
});
