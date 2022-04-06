const path = require ('path')
const htmlWebpackPlugin = require ('html-webpack-plugin')
//const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development': 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.jsx'), //arquivo inicial da aplicação
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        //hot: true,
    },
    plugins: [
       // isDevelopment && new ReactRefreshWebpackPlugin(),-> formato de if sem ternário (valor se false)
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        })
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude:/node_modules/,
                use: 'babel-loader',
                    /*options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    },*/
            },
            {
                test: /\.scss$/,
                exclude:/node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }
}