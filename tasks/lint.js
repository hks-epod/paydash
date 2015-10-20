'use strict';

var Gulp = require('gulp');
var jshint = require('gulp-jshint');

var paths = require('../config/assets');

Gulp.task('lint', function() {
    return Gulp.src(paths.get('/lint'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
