'use strict';
var Gulp = require('gulp');
var Nodemon = require('gulp-nodemon');
var bistre = require('bistre');

Gulp.task('nodemon', function() {

    var nodeArgs = [];
    if (process.env.DEBUGGER) {
        nodeArgs.push('--debug');
    }
    Nodemon({
            script: 'server.js',
            ext: 'hbs js',
            ignore: [
                'assets/',
                'node_modules/',
                '.build/',
                'test/',
            ],
            nodeArgs: nodeArgs
        })
        .on('restart', function(files) {
            console.log('change detected:', files);
        });
});
