var React = require('react');
var classNames = require('classnames');

var ListItem = React.createClass({
    propTypes: {
        active:    React.PropTypes.bool,
        href:      React.PropTypes.string,
        className: React.PropTypes.string,
        onClick:   React.PropTypes.func,
        children: React.PropTypes.node
    },

    getDefaultProps: function() {
        return {
            active: false,
            href:   '#'
        };
    },

    onClick: function(e) {
        if (!this.props.onClick) {
            return;
        }

        e.preventDefault();
        this.props.onClick();
    },

    render: function() {
        var className = classNames('list-group-item', this.props.className, {
            active: this.props.active
        });

        return (
            <a href={this.props.href} className={className} onClick={this.onClick}>{this.props.children}</a>
        );
    }
});

var ListGroup = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <ul className="list-group">
                {this.props.children}
            </ul>
        );
    }
});

module.exports = ListGroup;
module.exports.Item = ListItem;
