const React = require('react');
const classNames = require('classnames');

const Link = require('./Link');

const POSITIONS = [
    'top',
    'top-right',
    'right',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'top-left'
];

/**
 * Pop content with controls over content:
 *
 * <Popover.Container>
 *   <Button>Open</Button>
 *   {open?
 *      <Popover>
 *         <Popover.Heading title="Hello" />
 *         <Popover.Body>...</Popover.Body>
 *         <Popover.Controls>
 *           <Popover.Control onClick={...}>Say Hello</Popover.Control>
 *           <Popover.Control onClick={...}>Say World</Popover.Control>
 *         </Popover.Controls>
 *      </Popover>
 *   : null}
 * </Popover.Container>
 */

const Popover =  React.createClass({
    propTypes: {
        position: React.PropTypes.oneOf(POSITIONS),
        children: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            position: 'bottom'
        };
    },

    render() {
        const { position } = this.props;
        const className = classNames('popover', 'popover-' + position);

        return (
            <div className="popover-wrapper">
                <div className={className}>
                    <PopoverCard>
                        <div className="popover-arrow"></div>
                        {this.props.children}
                    </PopoverCard>
                </div>
            </div>
        );
    }
});

const PopoverContainer =  React.createClass({
    propTypes: {
        children:  React.PropTypes.node,
        className: React.PropTypes.string
    },

    render() {
        let { className, ...props } = this.props;
        className = classNames('popover-container', className);

        return (
            <div className={className} {...props} >
                {this.props.children}
            </div>
        );
    }
});

// The actual element that looks like a popup card.
const PopoverCard =  React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="popover-card" {...this.props}>
                {this.props.children}
            </div>
        );
    }
});

const PopoverBody =  React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="popover-body">
                {this.props.children}
            </div>
        );
    }
});

const PopoverTitle =  React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="popover-title">
                {this.props.children}
            </div>
        );
    }
});

const PopoverHeading =  React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        children: React.PropTypes.node
    },

    render() {
        let { title, children } = this.props;

        if (title) {
            children = <PopoverTitle>{title}</PopoverTitle>;
        }

        return (
            <div className="popover-heading">
                {children}
            </div>
        );
    }
});

const PopoverControl =  React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        onClick:  React.PropTypes.func,
        active:   React.PropTypes.bool
    },

    render() {
        const { onClick, children, active } = this.props;
        const className = classNames('control', { active });

        return (
            <Link className={className} onClick={onClick}>
                {children}
            </Link>
        );
    }
});

const PopoverControls =  React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="popover-controls">
                {this.props.children}
            </div>
        );
    }
});

module.exports           = Popover;
module.exports.Card      = PopoverCard;
module.exports.Body      = PopoverBody;
module.exports.Heading   = PopoverHeading;
module.exports.Title     = PopoverTitle;
module.exports.Container = PopoverContainer;
module.exports.Control   = PopoverControl;
module.exports.Controls  = PopoverControls;
