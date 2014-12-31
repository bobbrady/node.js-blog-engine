/*!
 * Bootstrap's Gruntfile modified by Bob Brady
 * http://getbootstrap.com
 * Copyright 2013-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    cssName: "sharp-reporter",

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
      ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
      ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
      ' */\n',

    // Task configuration.

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= cssName %>.css.map',
          sourceMapFilename: 'less/<%= cssName %>.css.map'
        },
        src: 'less/app.less',
        dest: 'public/css/<%= cssName %>.css'
      },
    },

    autoprefixer: {
      options: {
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 8",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'public/css/<%= cssName %>.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore: {
        src: 'public/css/<%= cssName %>.css',
        dest: 'public/css/<%= cssName %>.min.css'
      }
    },


    uglify: {
      options: {
        //the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/<%= pkg.name %>.min.js': ['public/js/<%= pkg.name %>.js']
        }
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: 'public/css/*.css'
      }
    }
  });



  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['less:compileCore', 'autoprefixer:core', 'usebanner', 'cssmin:minifyCore']);
  grunt.registerTask('dist-js', ['uglify']);

};
