module.exports = {
    entry : './scripts/app.js',
    output: {
        filename: './dist/bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['env'] }
                }]
            }
        ]
    }
};
