const path = require('path');

module.exports = {
    entry: {
        index: [
            path.resolve(__dirname, 'js/mobile.js'),
            path.resolve(__dirname, 'js/overlay.js'),
            path.resolve(__dirname, 'js/installations_count.js')
        ],
        about: [
            path.resolve(__dirname, 'js/mobile.js'),
            path.resolve(__dirname, 'js/show-more.js')
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './')
    }
};