var React = require('react');
var classNames = require('classnames');

var ListItem = React.createClass({
    propTypes: {
        active:    React.PropTypes.bool,
        href:      React.PropTypes.string,
        className: React.PropTypes.string,
        onClick:   React.PropTypes.func
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
            <a className={className} onClick={this.onClick}>{this.props.children}</a>
        );
    }
});

var ListGroup = React.createClass({
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
