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

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ['index.html', '_layouts/*.html', '_posts/*.md', '_includes/*.html'],
        tasks: ['shell:jekyllBuild']
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      svgIcons: {
        files: ['svg/*.svg'],
        tasks: ['svgstore', 'shell:jekyllBuild']
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
    },

    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:javivelasco/javivelasco.github.io.git',
          branch: 'gh-pages'
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('deploy', ['buildcontrol:pages']);
  grunt.registerTask('default', ['shell:jekyllBuild', 'sass', 'autoprefixer', 'svgstore', 'connect', 'watch']);
};
