var React = require('react');
var classNames = require('classnames');

var MenuItem = React.createClass({
    propTypes: {
        active:    React.PropTypes.bool,
        href:      React.PropTypes.string,
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    getDefaultProps: function() {
        return {
            active: false,
            href:   null
        };
    },

    render: function() {
        var inner;
        var className = classNames(this.props.className || '', {
            'active': this.props.active
        });

        if (this.props.href) {
            inner = <a href={this.props.href}>{this.props.children}</a>;
        } else {
            inner = <span>{this.props.children}</span>;
        }


        return (
            <li className={className}>{inner}</li>
        );
    }
});

var Menu = React.createClass({
    propTypes: {
        right: React.PropTypes.bool,
        left: React.PropTypes.bool,
        children: React.PropTypes.node
    },

    getDefaultProps: function() {
        return {
            active: false,
            href:   null
        };
    },

    render: function() {
        var className = classNames('menu', {
            'pull-right': this.props.right,
            'pull-left': this.props.left
        });

        return (
            <ul className={className}>
                {this.props.children}
            </ul>
        );
    }
});

module.exports = Menu;
module.exports.Item = MenuItem;
