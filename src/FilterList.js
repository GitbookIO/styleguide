var React = require('react');
var classNames = require('classnames');

var FilterItem = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        selected:  React.PropTypes.bool,
        href:      React.PropTypes.string,
        className: React.PropTypes.string,
        count:     React.PropTypes.number,
        onClick:   React.PropTypes.func
    },

    getDefaultProps() {
        return {
            selected: false,
            href:   '#'
        };
    },

    onClick(e) {
        if (!this.props.onClick) {
            return;
        }

        e.preventDefault();
        this.props.onClick();
    },

    render() {
        var className = classNames('filter-item', this.props.className, {
            selected: this.props.selected
        });
        var count = this.props.count;
        var href  = this.props.href;
        var inner = '';

        if (typeof count !== 'undefined') {
            inner = <span className="count">{count}</span>;
        }

        return (
            <li>
                <a className={className} href={href} onClick={this.onClick}>
                    {inner}
                    {this.props.children}
                </a>
            </li>
        );
    }
});

var FilterList = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <ul className="filter-list">
                {this.props.children}
            </ul>
        );
    }
});

module.exports = FilterList;
module.exports.Item = FilterItem;
