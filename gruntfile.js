module.exports = function(grunt){

  
  grunt.initConfig({
    watch: {
      css: {
        files: 'src/sass/**',
        tasks: ['sass']
      },
      html: {
        files: ['src/*.jade', 'src/tpl/**'],
        tasks: ['jade']
      },
      js: {
        files: 'src/js/**',
        tasks: ['jshint','uglify']
      },
      files: {
        files: ['src/assets/img/**']
      }
    },
      
    express: {
      all: {
        options: {
          livereload: true,
          port: 3103,
          bases: ['src'],
          open: 'http://localhost:3103'
        }
      }
    },
      
    //Compile
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: 'main.scss',
          dest: 'src/assets/css/',
          ext: '.css'
        }]
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },

        files: [ 
          {
            'src/index.html': ['src/index.jade']
          },
          {
            cwd: 'src/tpl',
            src: '**/*.jade',
            dest: 'src/assets/tpl',
            expand: true,
            ext: '.html'
          } 
        ]
      }
    },
      
      
    //Minify
    uglify: {
      my_target: {
        files: {
          'src/assets/js/app.js': ['src/js/**/*.js']
        }
      }
    },
      
    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: {
              'dist/assets/css/main.css': ['dist/assets/css/main.css']
            }
        }
    },
    
    
    //Copy and clean
    clean: {
      build: 'dist',
      unused: ['dist/*.jade', 'dist/tpl', 'dist/sass', 'dist/js'], 
      jade: 'src/assets/tpl', 
    },
      
    copy: {
      all: {
        files: [
          {expand: true, cwd: 'src/', src: ['**'],  dest: 'dist/'},
        ],
      }
    },
    
    //JsHint
    jshint: {
      all: ['gruntfile.js', 'src/js/**/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  
  grunt.registerTask('build', ['clean:build', 'compile', 'copy:all', 'cssmin', 'clean:unused']);
  grunt.registerTask('compile', ['clean:jade', 'sass', 'jade', 'uglify', 'jshint']);
  grunt.registerTask('server', ['express', 'watch'] );
  grunt.registerTask('run', ['compile', 'server'] );
};