var React = require('react');
var classNames = require('classnames');

var Tags = React.createClass({
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
        title:    React.PropTypes.string,
        selected: React.PropTypes.boolean,
        count:    React.PropTypes.number
    },

    render: function() {
        var selected = this.props.selected;
        var count    = this.props.count;
        var title    = this.props.title;
        var inner    = '';

        var className = classNames('tag', {
            'selected': selected
        });

        if (typeof count !== 'undefined') {
            inner = <span className="count">| {count}</span>;
        }

        return (
            <li className={className}>
                <span className="name">{title}</span>
                {inner}
            </li>
        );
    }
});

module.exports = Tags;
module.exports.Item = TagItem;
