const common = require('./webpack.config.js');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ]
});
