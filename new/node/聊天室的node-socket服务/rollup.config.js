const babel = require('@rollup/plugin-babel')

module.exports = {
    input: './server/index.js',
    output: {
        file: './dist/socket/bundle.js',
        format: 'umd'
    },
    treeshake: false,
    plugins: [
        babel({
            extensions: ['.js','.ts'],
            exclude: 'node_modules/**'
        })
    ]
}