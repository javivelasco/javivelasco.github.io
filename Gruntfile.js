module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    svgstore: {
      options: {
        prefix: 'shape-',
        cleanup: false,
        svg: {
          style: 'display: none;'
        }
      },
      default: {
        files: {
          '_includes/svg-defs.svg': ['svg/*.svg']
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('svg', ['svgstore']);
};
