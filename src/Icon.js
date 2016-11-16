const React = require('react');
const classNames = require('classnames');
const Octicon = require('./octicon');

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
