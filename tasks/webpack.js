'use strict';
var Gulp = require('gulp');
var Gutil = require('gulp-util');
var Webpack = require('webpack');

var UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
var ProvidePlugin = Webpack.ProvidePlugin;

Gulp.task('webpack', function() {

    var config = {
        entry: {
            vendor: ['jquery'],
            app: './assets/scripts/index.js'
        },
        output: {
            path: '.build/js/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.jsx$/,
                loader: 'babel'
            }]
        },
        devtool: 'source-map',
        plugins: [
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'root.jQuery': 'jquery'
            }),
            new CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js',
                minChunks: Infinity,
            })
        ]
    };

    Webpack(config, function(err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }
        Gutil.log('[webpack]', stats.toString({
            colors: true
        }));
    });


});
