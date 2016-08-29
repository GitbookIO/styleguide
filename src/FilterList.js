const React = require('react');
const classNames = require('classnames');

const FilterItem = React.createClass({
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
        const className = classNames('filter-item', this.props.className, {
            selected: this.props.selected
        });
        const count = this.props.count;
        const href  = this.props.href;
        let inner = '';

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

const FilterList = React.createClass({
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
