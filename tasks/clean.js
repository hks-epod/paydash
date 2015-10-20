'use strict';

var Gulp = require('gulp');
var Del = require('del');

Gulp.task('clean', function() {

    Del('.build').then(function(paths) {
        console.log('Deleted files/folders:\n', paths);
    });
});
