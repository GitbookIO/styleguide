var React = require('react');

var MenuItem = React.createClass({
    propTypes: {
        active:    React.PropTypes.bool,
        href:      React.PropTypes.string,
        className: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            active: false,
            href:   null
        };
    },

    render: function() {
        var inner;

        if (this.props.href) {
            inner = <a href={this.props.href}>{this.props.children}</a>;
        } else {
            inner = <span>{this.props.children}</span>;
        }


        return (
            <li className={this.props.className}>{inner}</li>
        );
    }
});

var Menu = React.createClass({
    render: function() {
        return (
            <ul className="menu">
                {this.props.children}
            </ul>
        );
    }
});

module.exports = Menu;
module.exports.Item = MenuItem;
