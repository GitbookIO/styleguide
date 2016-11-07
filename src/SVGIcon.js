const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');

const SVGIcon = React.createClass({
    propTypes: {
        svg:       React.PropTypes.string,
        className: React.PropTypes.string,
        size:      React.PropTypes.oneOf(SIZES)
    },

    getDefaultProps() {
        return {
            size: 'md'
        };
    },

    render() {
        const { svg, size, className } = this.props;
        const cl = classNames('SVGIcon', 'size-' + size, className);

        return <span className={cl} dangerouslySetInnerHTML={{ __html: svg }}></span>;
    }
});

module.exports = SVGIcon;
