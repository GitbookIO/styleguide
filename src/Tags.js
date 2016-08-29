const React = require('react');
const classNames = require('classnames');
const Icon = require('./Icon');

const Tags = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <ul className="tags">
                {this.props.children}
            </ul>
        );
    }
});

const TagItem = React.createClass({
    propTypes: {
        title:   React.PropTypes.string,
        href:    React.PropTypes.string,
        active:  React.PropTypes.bool,
        onClick: React.PropTypes.func,
        // count and showX are exclusive
        count:   React.PropTypes.number,
        showX:   React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            href: '#',
            showX: false
        };
    },

    onClick(e) {
        const { onClick }  = this.props;

        if (!onClick) {
            return;
        }

        e.preventDefault();
        onClick();
    },

    render() {
        const { active, count, showX, title, href } = this.props;

        const className = classNames('tag', {
            active
        });

        let inner = '';
        if (showX) {
            inner = <span className="extra"> <Icon id="x"/></span>;
        } else if (typeof count !== 'undefined') {
            inner = <span className="extra"> | {count}</span>;
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
