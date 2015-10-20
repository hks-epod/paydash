'use strict';

var Gulp = require('gulp');
var paths = require('../config/assets');

Gulp.task('watch', ['dev-build'], function() {
    Gulp.watch(paths.get('/fonts'), ['fonts']);
    Gulp.watch(paths.get('/styles'), ['styles']);
    Gulp.watch(paths.get('/scripts/main'), ['webpack']);
});
