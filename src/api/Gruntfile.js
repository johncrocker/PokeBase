module.exports = function (grunt) {
  grunt.registerTask('hello', 'My test task.', function () {
    grunt.log.writeln('Hello world');
  });
}

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['./public/javascripts/templates.js'],
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
          'public/javascripts/templates.js': ['templates/*.hbs']
        }
      }
    },
    nodemon: {
      dev: {
        script: './app.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('dev', ['clean', 'handlebars', 'nodemon:dev']);
  grunt.registerTask('prod', ['clean', 'handlebars']);
};