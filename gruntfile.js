module.exports = function(grunt){

  var isDev = grunt.option('dev');
  var env = (isDev) ? 'dev' : 'dist';
  
  var JADE_FILE_CFG = [ 
                        { 'src/index.html': ['src/index.jade']},
                        {
                          cwd: 'src/tpl',
                          src: '**/*.jade',
                          dest: 'src/assets/tpl',
                          expand: true,
                          ext: '.html'
                        } 
                      ];
  var UGLIFY_FILE_CFG = { 'src/assets/js/app.js': ['src/js/**/*.js'] };
  
  grunt.initConfig({
    watch: {
      css: {
        files: 'src/sass/**',
        tasks: ['sass']
      },
      html: {
        files: ['src/*.jade', 'src/tpl/**'],
        tasks: ['jade:dev']
      },
      js: {
        files: 'src/js/**',
        tasks: ['jshint','uglify:dev']
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
      all: {
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
      dev: {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: JADE_FILE_CFG
      },
      dist: {
        options: {
          data: {
            debug: false
          }
        },
        files: JADE_FILE_CFG
      }
    },
      
      
    //Minify
    uglify: {
      dev: {
        options: {
            beautify: true
        },
        files: UGLIFY_FILE_CFG
      },
      dist: {
        files: UGLIFY_FILE_CFG
      }
    },
      
    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: {
              'src/assets/css/main.css': ['src/assets/css/main.css']
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

  //Load taks
  var tasks;
  if(isDev){
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    tasks = ['jshint'];
  }else{
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    tasks = ['cssmin'];
  }
  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  var task_compile = ['clean:jade', 'sass', 'jade:'+env, 'uglify:'+env].concat(tasks);
  
  
  grunt.registerTask('build', ['clean:build', 'compile', 'copy:all', 'clean:unused']);
  grunt.registerTask('compile', task_compile);
  grunt.registerTask('server', ['express', 'watch'] );
  grunt.registerTask('run', ['compile', 'server'] );
};