'use strict';

var Gulp = require('gulp');
var Sass = require('gulp-sass');
var paths = require('../config/assets');
var autoprefixer = require('gulp-autoprefixer');

Gulp.task('styles', function() {
    Gulp.src('./assets/styles/index.scss')
        .pipe(Sass().on('error', Sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(Gulp.dest('.build/css/'));
});

Gulp.task('fonts', function() {
    return Gulp.src(paths.get('/fonts'))
        .pipe(Gulp.dest('.build/fonts'));
});

Gulp.task('images', function() {
    return Gulp.src(paths.get('/images'))
        .pipe(Gulp.dest('.build/images'));
});

Gulp.task('misc', function() {
    return Gulp.src(paths.get('/misc'))
        .pipe(Gulp.dest('.build/misc'));
});

Gulp.task('fonts', function() {
    return Gulp.src(paths.get('/fonts'))
        .pipe(Gulp.dest('.build/fonts'));
});
