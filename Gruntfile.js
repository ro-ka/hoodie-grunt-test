// Generated on<%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// Define Snippets and helper functions
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    folders: {
      app: 'app',
      www: 'www',
      tmp: '.tmp'
    },
    hoodie: {
      start: {
        options: {
          callback: function(stack) {
            grunt.config.set('connect.proxies.0.port', stack.www.port);
          }
        }
      }
    },
    watch: {
      stylus: {
        files: ['<%= folders.app %>/styles/{,*/}*.styl'],
        tasks: ['stylus:server']
      },
      livereload: {
        files: [
          '<%= folders.app %>/*.html',
          '{.tmp,<%= folders.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= folders.app %>}/scripts/{,*/}*.js',
          '<%= folders.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        options: {
          livereload: true
        }
      },
      jade: {
        files: ['app/jade/{,*/}*.jade', 'app/jade/**/{,*/}*.jade'],
        tasks: ['jade']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      proxies: [
        {
          context: '/_api',
          host: 'localhost',
          port: false,
          https: false,
          changeOrigin: false
        }
      ],
      server: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              proxySnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      www: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '<%= folders.www %>')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      www: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= folders.www %>/*',
            '!<%= folders.www %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    stylus: {
      options: {
        paths: ['<%= folders.app %>/styles']
      },
      www: {
        files: {
          '<%= folders.tmp %>/styles/main.css': ['<%= folders.app %>/styles/main.styl']
        }
      },
      server: {
        options: {
          compress: false,
          linenos: true,
          firebug: true
        },
        files: '<%= stylus.www.files %>'
      }
    },
    jade: {
      html: {
        files: grunt.file.expandMapping(['{,*/}*.jade', '!**/_*'], 'dest', {
          cwd: 'app/jade',
          rename: function (dest, src) {
            if (/i18n/.test(src)) {
              return '<%= folders.tmp %>/' + src.replace(/index.i18n-(.*).jade/, '$1.html');
            }

            return '<%= folders.tmp %>/' + src.replace(/\.jade$/, '.html');
          }
        }),
        options: {
          client: false,
          pretty: true,
          basedir: '<%= folders.app %>/jade',
          data: function(dest, src) {

            var page = src[0].replace(/app\/jade\/(.*)\/index.jade/, '$1');

            return {
              page: page
            };
          }
        }
      }
    },
    rev: {
      www: {
        files: {
          src: [
            '<%= folders.www %>/scripts/{,*/}*.js',
            '<%= folders.www %>/styles/{,*/}*.css',
            '<%= folders.www %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= folders.www %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= folders.tmp %>/index.html',
      options: {
        dest: '<%= folders.www %>'
      }
    },
    usemin: {
      html: ['<%= folders.www %>/{,*/}*.html'],
      css: ['<%= folders.www %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= folders.www %>']
      }
    },
    imagemin: {
      www: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= folders.www %>/images'
        }]
      }
    },
    svgmin: {
      www: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= folders.www %>/images'
        }]
      }
    },
    cssmin: {
      www: {
        files: {
          '<%= folders.www %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      www: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/folders/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= folders.tmp %>',
          src: '{,*/}*.html',
          dest: '<%= folders.www %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      www: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.www %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*'
          ]
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: [
            'scripts/{,*/}*js'
          ]
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: [
            'styles/{,*/}*css'
          ]
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.www %>',
          src: [
            'assets/{,*/}*.*'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'stylus:server'
      ],
      test: [
        'stylus:www'
      ],
      www: [
        'stylus:www',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'www') {
      return grunt.task.run(['build', 'open', 'connect:www:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'hoodie',
      'jade',
      'configureProxies',
      'concurrent:server',
      'connect:server',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:www',
    'jade',
    'copy:js',
    'copy:css',
    'useminPrepare',
    'concurrent:www',
    'cssmin',
    'concat',
    'uglify',
    'copy:www',
    'copy:assets',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
