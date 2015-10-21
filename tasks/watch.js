'use strict';

var Gulp = require('gulp');
var paths = require('../config/assets');

Gulp.task('watch', ['dev-build'], function() {
    Gulp.watch(paths.get('/fonts'), ['fonts']);
    Gulp.watch(paths.get('/styles'), ['styles']);
    // Js watch is done with webpack for performance
});
