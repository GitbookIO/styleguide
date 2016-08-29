const React      = require('react');
const classNames = require('classnames');

/**
 * <Tabs>
 *   <Tabs.Nav>
 *     <Tabs.Item active>Hello</Tabs.Item>
 *     <Tabs.Item>World</Tabs.Item>
 *   </Tabs.Nav>
 *   <Tabs.Content>
 *
 *   </Tabs.Content>
 * </Tabs>
 */

const Tabs = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="tabs">
                {this.props.children}
            </div>
        );
    }
});

const TabsNav = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="tabs-nav">
                {this.props.children}
            </div>
        );
    }
});

const TabsItem = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        active:   React.PropTypes.bool,
        href:     React.PropTypes.string,
        onClick:  React.PropTypes.func
    },

    getDefaultProps() {
        return {
            href: '#'
        };
    },

    onClick(event) {
        const { onClick } = this.props;

        if (onClick) {
            event.preventDefault();
            onClick();
        }
    },

    render() {
        let { children, href, active } = this.props;

        return (
            <li className={classNames({ active })}>
                <a href={href} onClick={this.onClick}>{children}</a>
            </li>
        );
    }
});

const TabsContent = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="tabs-content">
                {this.props.children}
            </div>
        );
    }
});


module.exports         = Tabs;
module.exports.Nav     = TabsNav;
module.exports.Item    = TabsItem;
module.exports.Content = TabsContent;
