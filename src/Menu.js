const React = require('react');
const classNames = require('classnames');

/**
 *   <Menu>
 *       <Menu.Item>...</Menu.Item>
 *       <Menu.Item>...</Menu.Item>
 *       <Menu.Item>...</Menu.Item>
 *   </Menu>
 */
const MenuItem = React.createClass({
    propTypes: {
        active:    React.PropTypes.bool,
        href:      React.PropTypes.string,
        className: React.PropTypes.string,
        onClick:   React.PropTypes.func,
        children:  React.PropTypes.node
    },

    getDefaultProps() {
        return {
            active: false,
            href:   null
        };
    },

    render() {
        const { href, onClick } = this.props;
        const className = classNames(this.props.className || '', {
            'active': this.props.active
        });

        return (
            <li className={className}>
                <a href={href || '#'} onClick={onClick}>
                    {this.props.children}
                </a>
            </li>
        );
    }
});

const Menu = React.createClass({
    propTypes: {
        right: React.PropTypes.bool,
        left: React.PropTypes.bool,
        children: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            active: false,
            href:   null
        };
    },

    render() {
        const className = classNames('menu', {
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
