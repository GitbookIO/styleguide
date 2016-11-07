#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

const iconsFolder = path.resolve(__dirname, '../icons');

// List icons
const icons = fs.readdirSync(iconsFolder);

// Convert icons
icons.forEach(icon => {
    const ext = path.extname(icon);
    if (ext != '.svg') {
        return;
    }

    const iconBasename = path.basename(icon, ext);
    const iconPath = path.resolve(iconsFolder, icon);
    const iconOutput = path.resolve(iconsFolder, `${iconBasename}.js`);

    // Read the SVG
    const svg = fs.readFileSync(iconPath, 'utf-8');

    // Generate code
    const componentName = iconBasename;
    const code =
`
// Auto-generated file, do not edit!
var React = require('react');
var SVGIcon = require('../lib/SVGIcon')
var svg = ${JSON.stringify(svg)}

var ${componentName} = function() {
    return React.createElement(SVGIcon, {
        className: "${componentName}",
        svg: svg
    });
};
module.exports = ${componentName};
`;

    fs.writeFileSync(iconOutput, code);
});
