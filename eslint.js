
// const OFF = 0;
// const WARNING = 1;
const ERROR = 2;

module.exports = {
    'rules': {
        // Use indentation of 4 spaces
        'indent': [ ERROR, 4 ],

        // Use single quotes
        'quotes': [ ERROR, 'single' ],

        // Use unix line break (\n and not \r\n)
        'linebreak-style': [ ERROR, 'unix' ],


        // Require object shorthand (see spec/object-shorthand.js)
        'object-shorthand': [ ERROR, 'always' ],

        // Always end lines with semi-colons
        'semi': [ ERROR, 'always' ],

        // Dont accept unused variables
        'no-unused-vars': [ ERROR, {
            'vars': 'all',
            'args': 'none'
        } ],

        'no-extra-boolean-cast': [ 0 ],
        'spaced-comment': [ 2, 'always' ],

        // React configuration
        'react/jsx-uses-vars':            ERROR,
        'react/jsx-uses-react':           ERROR,
        'react/jsx-no-undef':             ERROR,
        'react/jsx-no-duplicate-props':   ERROR,
        'react/no-deprecated':            ERROR,
        'react/no-did-mount-set-state':   ERROR,
        'react/no-did-update-set-state':  ERROR,
        'react/no-direct-mutation-state': ERROR,
        'react/no-is-mounted':            ERROR,
        'react/no-unknown-property':      ERROR,
        'react/prop-types':               ERROR,
        'react/react-in-jsx-scope':       ERROR,

        // Specify whether double or single quotes should be used in JSX attributes
        // http://eslint.org/docs/rules/jsx-quotes
        'jsx-quotes': [ERROR, 'prefer-double']
    },
    'parserOptions': {
        'ecmaVersion': 5,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
            'experimentalObjectRestSpread': true
        }
    },
    'env': {
        'node': true,
        'browser': true
    },
    'plugins': [
        'react'
    ],
    'extends': 'eslint:recommended'
};
