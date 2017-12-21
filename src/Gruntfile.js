module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['ui/app/app.min.js', 'ui/app/app.js', 'ui/app/templates.min/*.html'],
        concat: {
            options: {},
            build: {
                src: ['ui/app/startup.js', 'ui/app/services/*.js', 'ui/app/directives/*.js', 'ui/app/filters/*.js', 'ui/app/interceptors/*.js', 'ui/app/controllers/*.js'],
                dest: 'ui/app/app.js'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: {
                    'ui/app/app.min.js': ['ui/app/app.js']
                }
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'ui/app/templates.min/Evolutions.html': 'ui/app/templates/Evolutions.html',
                    'ui/app/templates.min/Generation.html': 'ui/app/templates/Generation.html',
                    'ui/app/templates.min/Generations.html': 'ui/app/templates/Generations.html',
                    'ui/app/templates.min/Home.html': 'ui/app/templates/Home.html',
                    'ui/app/templates.min/Pokemon.html': 'ui/app/templates/Pokemon.html'
                }
            }
        },
        watch: {
            scripts: {
                files: ['api/routes/**/*', 'api/configurations/**/*', 'api/database/**/*', 'api/app.js', 'ui/**/*'],
                tasks: ['build'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.registerTask('run-grunt:dev', function () {
        var done = this.async();
        var child = grunt.util.spawn({
            grunt: true,
            args: ['dev'],
            opts: {
                cwd: 'api'
            }
        }, function (err, result, code) {
            done();
        });

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });

    grunt.registerTask('run-grunt:prod', function () {
        var done = this.async();
        var child = grunt.util.spawn({
            grunt: true,
            args: ['prod'],
            opts: {
                cwd: 'api'
            }
        }, function (err, result, code) {
            done();
        });

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('build', ['clean', 'htmlmin', 'concat', 'uglify']);
    grunt.registerTask('dev', ['build', 'run-grunt:dev', 'watch']);
    grunt.registerTask('prod', ['build', 'run-grunt:prod');
    grunt.registerTask('cleanup', ['clean']);
};