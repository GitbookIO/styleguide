'use strict';

const path = require('path');

function moduleContainer(mod) {
    const pkgPath = require.resolve(mod+'/package.json');
    return path.resolve(
        path.dirname(pkgPath)
        , '..');
}


module.exports = {
    assets: path.resolve(__dirname, 'assets'),
    less: {
        // Required less path
        paths: [
            path.resolve(__dirname, 'less'),
            moduleContainer('octicons'),
            moduleContainer('gitbook-markdown-css')
        ]
    }
};
