module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 8080,
          base: '_site'
        }
      }
    },

    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '_site/css/global-unprefixed.css': 'scss/global.scss'
        }
      }
    },

    autoprefixer: {
      global: {
        src: '_site/css/global-unprefixed.css',
        dest: '_site/css/global.css'
      }
    },

    uglify: {
      global: {
        files: {
          'js/site.min.js': ['js/site.js']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ['index.html', '_layouts/*.html', '_posts/*.md', '_includes/*.html'],
        tasks: ['build']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['build']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['build']
      },
      svgIcons: {
        files: ['svg/*.svg'],
        tasks: ['build']
      }
    },

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
  grunt.registerTask('build', ['shell:jekyllBuild', 'sass', 'autoprefixer', 'svgstore']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
