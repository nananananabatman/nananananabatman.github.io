module.exports = {
    entry : ["babel-polyfill", './scripts/index.js'],
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
                    options: { presets: [
                        ['env', {
                            "targets": {
                                "browsers": ["last 2 versions", "safari >= 7"]
                            }
                        }]
                    ]}
                }]
            }
        ]
    }
}
