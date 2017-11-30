module.exports = function (grunt) {
  grunt.registerTask('hello', 'My test task.', function () {
    grunt.log.writeln('Hello world');
  });
}

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          processName: function (filePath) {
            var args = filePath.split('/');
            var name = args[args.length - 1];
            return name.toLowerCase().replace('.hbs', '');
          },
          namespace: 'JST'
        },
        files: {
          '../public/javascripts/templates.js': ['templates/*.hbs']
        }
      }
    },
    watch: {
      scripts: {
        files: ['routes/*.js', 'templates/*.hbs'],
        tasks: ['clean', 'handlebars', 'express:dev'],
        options: {
          spawn: false,
        },
      },
    },
    nodemon: {
      dev: {
        script: './app.js'
      }
    },
    express: {
      options: {},
      dev: {
        options: {
          script: './app.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('dev', ['handlebars', 'express:dev', 'watch']);
  grunt.registerTask('prod', ['handlebars']);
};