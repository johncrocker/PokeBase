module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),       
        express: {
            options: {},
            dev: {
                options: {
                    script: './app.js',
                    node_env: 'development'
                }
            },
            prod: {
                options: {
                    script: './app.js',
                    node_env: 'production'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('dev', ['express:dev']);
    grunt.registerTask('prod', ['express:prod']);
};