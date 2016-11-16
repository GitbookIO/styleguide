const React = require('react');
const classNames = require('classnames');
const octicons = require('octicons');

const SVGIcon = require('./SVGIcon');

/**
 * Render an octicon SVG using GithUb's library
 * @type {ReactClass}
 */
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

/**
 * Render an icon from octicon or font-awesome
 * @type {ReactClass}
 */
const Icon = React.createClass({
    propTypes: {
        // Icon of the icon in the collection
        id:        React.PropTypes.string,
        // Type of collection
        type:      React.PropTypes.string,
        // Extra className
        className: React.PropTypes.string,
        // Is the icon spinning?
        spin:      React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            type: 'octicon',
            spin: false
        };
    },

    render() {
        let { type, id, className, spin, ...props } = this.props;

        if (type == 'octicon') {
            return <Octicon id={id} {...props} />;
        }

        className = classNames(
            type + ' ' + type + '-' + id,
            className,
            {
                'icon-spin': spin
            }
        );

        return <i className={className}></i>;
    }
});

module.exports = Icon;
