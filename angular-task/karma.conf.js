const path = require('path');

module.exports = function(config) {
	config.set({
		basePath: '.',
		frameworks: ['jasmine'],
		files: [
			{pattern: 'src/**/*.js', watched: false},
			{pattern: 'test/**/*.js', watched: false},
			{pattern: 'src/**/*.html', watched: false}
		],
		reporters: ['progress', 'coverage'],
		preprocessors: {
			'src/**/*.js': ['webpack', 'sourcemap'],
			'test/**/*.js': ['webpack', 'sourcemap'],
			'**/*.html': ['ng-html2js']
		},
		coverageReporter: {
			reporters: [{type: 'html', dir: 'reports/coverage/'}, {type: 'lcovonly', dir: 'reports/coverage/', subdir: '.', file: 'lcov.info'}]
		},
		coverageIstanbulReporter: {
			reports: ['lcov'],
			dir: './reports/',
			fixWebpackSourcePaths: true
		},
		ngHtml2JsPreprocessor: {
			moduleName: 'directives'
		},
		webpack: {
			module: {
				rules: [
					{
						test: /\.js$/,
						include: path.resolve('src/'),
						loader: 'istanbul-instrumenter-loader'
					},
					{test: /\.html$/, loader: 'text-loader'},
				]
			},
			devtool: 'inline-source-map'
		},
		browsers: ['Chrome'],
		captureTimeout: 60000,
		browserNoActivityTimeout: 50000,
		singleRun: true
	});
};
