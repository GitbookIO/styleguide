const React = require('react');
const classNames = require('classnames');

const Icon = require('./icon');

const PADDING_INITIAL = 10;
const DEPTH_PADDING   = 18;

const STATUS = [
    'danger', 'success', 'warning', 'selected'
];

/**
 * Tree component:
 *
 * <Tree>
 *      <Tree.Node>
 *          <Tree.Leaf>
 *              <Tree.Toggle /> My Directory
 *          </Tree.Leaf>
 *          <Tree>...</Tree>
 *      </Tree.Node>
 *      <Tree.Node>
 *          <Tree.Leaf>My File</Tree.Leaf>
 *      </Tree.Node>
 * </Tree>
 */

const Tree = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        depth: React.PropTypes.number
    },
    contextTypes: {
        depth: React.PropTypes.number
    },
    childContextTypes: {
        depth: React.PropTypes.number
    },

    getChildContext() {
        let depth = this.props.depth || this.context.depth || 0;

        return {
            depth: (depth + 1)
        };
    },

    render() {
        return (
            <div className="Tree">
                {this.props.children}
            </div>
        );
    }
});

const TreeNode = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="TreeNode">
                {this.props.children}
            </div>
        );
    }
});

/**
 * Inner content of a tree node
 */
const TreeLeaf = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        href:     React.PropTypes.string,
        onClick:  React.PropTypes.func,
        status:   React.PropTypes.oneOf(STATUS)
    },
    contextTypes: {
        depth: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            href: '#'
        };
    },

    onClick(event) {
        let { onClick } = this.props;
        if (!onClick) {
            return;
        }

        event.preventDefault();
        onClick();
    },

    render() {
        let { href, status } = this.props;
        let { depth } = this.context;

        let style = {
            paddingLeft: (PADDING_INITIAL + depth*DEPTH_PADDING)
        };

        let className = classNames('TreeLeaf', status? 'status-' + status : '');

        return (
            <a className={className} href={href} style={style}>
                {this.props.children}
            </a>
        );
    }
});

/**
 * Little triangle to toggle sub-tree.
 * Insert a TreeToggle in a TreeLeaf
 */
const TreeToggle = React.createClass({
    propTypes: {
        active:  React.PropTypes.bool,
        onClick: React.PropTypes.func
    },

    onClick(event) {
        let { onClick } = this.props;

        event.preventDefault();
        event.stopPropagation();

        if (onClick) onClick();
    },

    render() {
        let { active } = this.props;
        let className = classNames('TreeToggle', {
            active
        });

        return (
            <span className={className}>
                <Icon id={active? 'triangle-down' : 'triangle-right'} />
            </span>
        );
    }
});

module.exports = Tree;
module.exports.Node = TreeNode;
module.exports.Leaf = TreeLeaf;
module.exports.Toggle = TreeToggle;
