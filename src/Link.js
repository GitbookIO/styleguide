const React = require('react');
const classNames = require('classnames');

const Link = React.createClass({
    propTypes: {
        href:       React.PropTypes.string,
        className:  React.PropTypes.string,
        children:   React.PropTypes.node,
        muted:      React.PropTypes.bool,
        underlined: React.PropTypes.bool,
        onClick:    React.PropTypes.func
    },

    getDefaultProps() {
        return {
            href: '#'
        };
    },

    onClick(e) {
        const { onClick } = this.props;

        if (onClick) {
            e.preventDefault();
            onClick(e);
        }
    },

    render() {
        let { href, className, children, muted, underlined,
              onClick, // eslint-disable-line no-unused-vars
              ...props } = this.props;

        className = classNames(className, {
            'muted-link':      muted,
            'underlined-link': underlined
        });

        return (
            <a className={className}
               href={href}
               onClick={this.onClick}
               {...props} >
                {children}
            </a>
        );
    }
});

module.exports = Link;
