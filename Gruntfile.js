'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'server.js',
        ext: 'js,dust',
        ignore: ['node_modules/**'],
        watch: ['server']
      }
    }
  });
  // Load the project's grunt tasks from a directory
  require('grunt-config-dir')(grunt, {
    configDir: require('path').resolve('tasks')
  });

  grunt.loadNpmTasks('grunt-makara-browserify');
  grunt.loadNpmTasks('grunt-nodemon');


  // Register group tasks
  grunt.registerTask('build', ['jshint', 'dustjs', 'makara-browserify', 'less', 'browserify', 'copyto']);
  grunt.registerTask('test', ['jshint', 'mochacli']);
  grunt.registerTask('default', ['nodemon']);


};
