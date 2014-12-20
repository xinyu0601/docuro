
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: ["build"],
		
		copy: {
			copyFiles: {
				files: [
					{
						expand: true,
						flatten: true,
						 src: [
							'assets/font/**'
						], 
						dest: 'build/assets/font/',
					    filter: 'isFile'
					},	
					{
						expand: true,
						flatten: true,
						 src: [
							'assets/ico/**'
						], 
						dest: 'build/assets/ico/',
					    filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						 src: [
							'assets/images/**'
						], 
						dest: 'build/assets/images',
					    filter: 'isFile'
					},
					{
						expand: true,
						flatten: true,
						 src: [
							'docuro.go',
							'Procfile'
						], 
						dest: 'build',
					    filter: 'isFile'
					}

				]
			}
		},

		concat: {
			generated: {
				files: [
					{ 
						dest: 'build/assets/css/style.css',
						src: [ 
							'assets/css/bootstrap.min.css',
							'assets/css/jquery.gritter.css',
							'assets/css/app.css'
						]	
					},
					{ 
						dest: 'build/assets/js/app.js',
						src: [ 
							"app/app.js",
							"app/shared/services.js",
							"app/shared/filters.js",
							"app/shared/viewmodel.js",
							"app/components/masthead/mastheadController.js",
							"app/components/footer/footerController.js",
							"app/components/dashboard/dashboardController.js",
							"app/components/container/containerController.js",
							"app/components/containers/containersController.js",
							"app/components/sidebar/sidebarController.js",
							"app/components/images/imagesController.js",
						]	
					}
				]
			} 
		},

		cssmin: {
			shrinkCSS: {
				options: {
					keepSpecialComments: 0
				},
				files: {
					'build/assets/css/style.css': [
						'build/assets/css/style.css'
					]
				}
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			shrinkJS: {
				files: [
					{
						"build/assets/js/app.js": [
							"build/assets/js/app.js"
						]
					},
					{
						expand: true,
						cwd: 'assets/js',
						src: '**/*.js',
						dest: 'build/assets/js'
					}
				]
			}
		},
		htmlcompressor: {
			shrinkHTML: {
				files: [
					{
						expand: true,
						src: [
							'index.html'
						],
						dest: 'build'
					},
					{
						expand: true,
						cwd: "app",
						src: [
							'**/*.html'
						],
						dest: 'build/app'
					}
				],
				options: {
					type: 'html',
					preserveServerScript: true
				}
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-htmlcompressor');

	// Default task(s).
	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'copy', 'concat', 'cssmin', 'uglify', 'htmlcompressor']);

};