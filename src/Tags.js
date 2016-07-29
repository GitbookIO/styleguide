var React = require('react');
var classNames = require('classnames');

var Tags = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <ul className="tags">
                {this.props.children}
            </ul>
        );
    }
});

var TagItem = React.createClass({
    propTypes: {
        title:   React.PropTypes.string,
        href:    React.PropTypes.string,
        active:  React.PropTypes.bool,
        count:   React.PropTypes.number,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            href: '#'
        };
    },

    onClick: function(e) {
        var onClick  = this.props.onClick;

        if (!onClick) {
            return;
        }

        e.preventDefault();
        onClick();
    },

    render: function() {
        var active = this.props.active;
        var count    = this.props.count;
        var title    = this.props.title;
        var href     = this.props.href;
        var inner    = '';

        var className = classNames('tag', {
            'active': active
        });

        if (typeof count !== 'undefined') {
            inner = <span className="count">| {count}</span>;
        }

        return (
            <li className={className}>
                <a href={href} onClick={this.onClick}>
                    <span className="name">{title}</span>
                    {inner}
                </a>
            </li>
        );
    }
});

module.exports = Tags;
module.exports.Item = TagItem;
