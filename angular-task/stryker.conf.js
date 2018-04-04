module.exports = function(config){
  config.set({
    mutate: ['src/**/*.js'], // here we define which files we want to be mutated
    testFramework: 'jasmine',
    testRunner: 'karma',
    karmaConfigFile: 'karma.conf.js',
    reporter: ['progress', 'clear-text', 'dots', 'html', 'event-recorder'],
    coverageAnalysis: 'off',
    plugins: ['stryker-karma-runner', 'stryker-html-reporter']
  });
}
