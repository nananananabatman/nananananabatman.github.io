module.exports = {
    entry : './scripts/index.js',
    output: {
        filename: './dist/bundle.js'
    },
    resolveLoader: {
        modules: ["node_modules", "loaders"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['env'] }
                }]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.json$/,
                use: 'my-json-loader'
            }
        ]
    }
};
