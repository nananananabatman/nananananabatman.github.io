module.exports = {
    devtool: 'inline-source-map',
    entry : './src/app.js',
    output: {
        filename: './dist/[name].js'
    },
    resolveLoader: {
        modules: ["node_modules", "loaders"]
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['env'] }
                }]
            }, {
                test: /.html?$/,
                use: [{
                    loader: 'text-loader'
                }]
            }
        ]
    }
};
