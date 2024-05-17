
const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: '[name]-[contenthash:4].js',
        chunkFilename:'[name]-main.[contenthash:4].js',
        path: path.resolve(process.cwd(), './dist'),
    },
};