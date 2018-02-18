module.exports = {
    devtool: 'inline-source-map',
    entry : './blogs/app.react.js',
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
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};
