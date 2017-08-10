'use strict';
const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Webpack = require('webpack');

var webpackConfig = {
    entry: {
        vendor: ['jquery', 'd3', 'react'],
        app: './assets/scripts/index.js',
        monitor: './assets/scripts/monitor.js'
    },
    externals: 'fs',
    output: {
        path: '.build/js/',
        filename: '[name].bundle.js'
    },
    cache: true,
    devtool: 'cheap-module-source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: { compact: false },
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        })
    ]
};

// Webpack production build
Gulp.task('webpack:build', function() {
    var prodConfig = Object.create(webpackConfig);

    prodConfig.plugins = prodConfig.plugins.concat(
        new Webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );

    Webpack(prodConfig, function(err, stats) {
        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }
        Gutil.log(
            '[webpack]',
            stats.toString({
                colors: true
            })
        );
    });
});

// Set dev config for webpack
var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'sourcemap';
devConfig.debug = true;

// Create a single instance of the compiler to allow caching
var devCompiler = Webpack(devConfig);

Gulp.task('webpack:dev-build', function() {
    devCompiler.watch({}, function(err, stats) {
        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }
        Gutil.log(
            '[webpack:build-dev]',
            stats.toString({
                colors: true,
                chunks: false
            })
        );
    });
});
