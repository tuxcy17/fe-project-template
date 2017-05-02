module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            distCss: {
                src: ['public/stylesheets/*.css'],
                dest: 'public/stylesheets/__build.scss'
            },
            distJs: {
                src: ['public/javascripts/clean/bg/**/*.js'],
                dest: 'public/javascripts/clean/AncAppModule.js'
            }
        },

        less: {
            development: {
                options: {
                    paths: ['less-sources']
                },
                files: {
                    'less-sources/dist/out.css': 'less-sources/*.less'
                }
            }
        },

        clean: {
            cssClean: ['less-sources/dist', 'app/public/css/main.css'],
            jsClean: ['app/public/js/vendor.js', 'app/public/js/deps.js', 'app/public/js/AppModule.js']
        },

        // closureBuilder:  {
        //     options: {
        //         builder: '/home/tuxcy/tools/closure-library-20170409/closure/bin/build/closurebuilder.py',
        //
        //         // [REQUIRED] One of the two following options is required:
        //         inputs: './js-sources/**/*.js', // input files (can just be the entry point)
        //
        //         compilerFile: '/home/tuxcy/tools/closure-compiler/compiler.jar',
        //
        //         // [OPTIONAL] output_mode can be 'list', 'script' or 'compiled'.
        //         //    If compile is set to true, 'compiled' mode is enforced.
        //         //    Default is 'script'.
        //         output_mode: 'script',
        //         compile: false,
        //         // compilerOpts: {
        //         //
        //         // },
        //         // execOpts: {
        //         //     /**
        //         //      * Set maxBuffer if you got message "Error: maxBuffer exceeded."
        //         //      * Node default: 200*1024
        //         //      */
        //         //     maxBuffer: 5000 * 1024
        //         // }
        //     },
        //
        //     // any name that describes your operation
        //     targetName: {
        //         src: 'js-sources/app/**/*.js',
        //         dest: 'app/public/js/module.js'
        //     }
        // },

        closureDepsWriter: {
            options: {
                depswriter: '/home/tuxcy/tools/closure-library-20170409/closure/bin/build/depswriter.py', // filepath to depswriter
                root_with_prefix: '"js-sources/app ../../../test/js/app"'
            },
            compileCommon: {
                dest: 'app/public/js/deps.js'
            }
        },

        closureCompiler:  {

            options: {
                compilerFile: '/home/tuxcy/tools/closure-compiler/compiler.jar',
                checkModified: false,
                compilerOpts: {
                    compilation_level: 'WHITESPACE_ONLY',
                    externs: ['app/public/js/base.js', 'app/public/js/deps.js', 'app/public/js/vendor.js'],
                    // define: ["'goog.DEBUG=false'"],
                    warning_level: 'verbose',
                    // jscomp_off: ['checkTypes', 'fileoverviewTags'],
                    summary_detail_level: 3,
                    // output_wrapper: '"(function(){%output%}).call(this);"'
                },
                execOpts: {
                    maxBuffer: 999999 * 1024
                },
                d32: false, // will use 'java -client -d32 -jar compiler.jar'
                TieredCompilation: false // will use 'java -server -XX:+TieredCompilation -jar compiler.jar'
            },

            // any name that describes your task
            targetName: {
                // TEMPcompilerOpts: {
                // },
                src: 'js-sources/**/*.js',
                dest: 'app/public/js/module.js'
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'app/public/css/main.css': ['less-sources/dist/*.css'],
                    'app/public/css/vendor.css': ['app/public/css/vendor.css']
                }
            }
        },

        bower_concat: {
            js: {
                dest: {
                    'js': 'app/public/js/vendor.js'
                },
                bowerOptions: {
                    relative: false
                },
                mainFiles: {
                    "bootstrap": ['dist/css/bootstrap.css', 'dist/css/bootstrap-theme.css'],
                    "angular": ['angular-csp.css', 'angular.js']
                },
                includeDev: true
            },
            css: {
                dest: {
                    'css': 'app/public/css/vendor.css'
                },
                bowerOptions: {
                    relative: false
                },
                mainFiles: {
                    "bootstrap": ['dist/css/bootstrap.css', 'dist/css/bootstrap-theme.css'],
                    "font-awesome": ['css/font-awesome.css'],
                    "angular": ['angular-csp.css']
                },
                includeDev: true
            }
        },

        uglify: {
            options: {
                mangle: {
                    // except: ['jQuery', 'Backbone']
                }
            },
            compileVendor: {
                files: {
                    'app/public/js/vendor.js': ['app/public/js/vendor.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-closure-tools');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dev-css', ['clean:cssClean', 'less:development', 'bower_concat:css', 'cssmin']);

    // grunt.registerTask('dev-js', ['clean:jsClean', 'bower_concat:js', 'uglify:compileVendor', 'closureDepsWriter', 'closureCompiler:targetName']);
    // grunt.registerTask('dev-js', ['clean:jsClean', 'bower_concat:js', 'uglify:compileVendor', 'closureDepsWriter']);
    grunt.registerTask('dev-js', ['clean:jsClean', 'bower_concat:js', 'closureDepsWriter', 'closureCompiler']);

    grunt.registerTask('dev-grunt', ['dev-css', 'dev-js']);


    grunt.registerTask('default', ['jshint']);

};