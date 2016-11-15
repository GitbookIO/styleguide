const React = require('react');
const octicons = require('octicons');

const SVGIcon = require('./SVGIcon');

const Octicon = React.createClass({
    propTypes: {
        id: React.PropTypes.string
    },

    render() {
        const { id, ...props } = this.props;
        const icon = octicons[id];
        const svg = icon.toSVG();

        return <SVGIcon svg={svg} {...props} />;
    }
});

module.exports = Octicon;
