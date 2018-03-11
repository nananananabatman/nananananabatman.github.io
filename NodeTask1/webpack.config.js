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
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react', 'stage-0']
                }
            }
        ]
    }
};
