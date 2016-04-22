module.exports = function(grunt){

  var envParam = grunt.option('env');
  var port = grunt.option('port');
  
  var env = (envParam === 'dev') ? 'dev' : 'dist';
  var PUBLIC_HTML = 'public';
  var DIST = 'dist';
  var PORT = port || 3103;
  var URL =  'http://localhost:'+PORT;
  var OPEN = true;
  
  var JADE_FILE_CFG = [ 
                        { 
                          cwd: 'src/',
                          src: '*.jade',
                          dest: PUBLIC_HTML,
                          expand: true,
                          ext: '.html'
                        },
                        {
                          cwd: 'src/tpl',
                          src: '**/*.jade',
                          dest: PUBLIC_HTML + '/assets/tpl',
                          expand: true,
                          ext: '.html'
                        } 
                      ];
  var UGLIFY_FILE_CFG = { 'public/assets/js/app.js': ['src/js/**/*.js'] };
  
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
        files: [PUBLIC_HTML + '/assets/img/**']
      }
    },
      
    express: {
      all: {
        options: {
          livereload: OPEN,
          port: PORT,
          bases: [PUBLIC_HTML],
          open: URL
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
          dest: PUBLIC_HTML + '/assets/css/',
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
              'public/assets/css/main.css': [PUBLIC_HTML + '/assets/css/main.css']
            }
        }
    },
    
    
    //Copy and clean
    clean: {
      build: DIST,
      unused: [DIST + '/*.jade', DIST + '/tpl', DIST + '/sass', DIST + '/js'], 
      jade: [PUBLIC_HTML + '/assets/tpl', PUBLIC_HTML + '/*.html' ], 
    },
      
    copy: {
      all: {
        files: [
          {expand: true, cwd: PUBLIC_HTML + '/', src: ['**'],  dest: DIST + '/'},
        ],
      }
    },
    
    //JsHint
    jshint: {
      all: ['gruntfile.js', PUBLIC_HTML + '/js/**/*.js']
    }

  });

  //Load taks
  var tasks;
  if(env === 'dev'){
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
  var task_compile = ['clean:jade', 'sass', 'jade:' + env, 'uglify:' + env].concat(tasks);
  
  
  grunt.registerTask('build', ['clean:build', 'compile', 'copy:all', 'clean:unused']);
  grunt.registerTask('compile', task_compile);
  grunt.registerTask('server', ['express', 'watch'] );
  grunt.registerTask('run', ['compile', 'server'] );
};