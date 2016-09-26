const React = require('react');
const classNames = require('classnames');

const Link = require('./Link');

const POSITIONS = ['bottom', 'top'];

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
            position: POSITIONS[0]
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

const PopoverHeading =  React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        children: React.PropTypes.node
    },

    render() {
        if (this.props.title) {
            return (
                <div className="popover-heading">
                    <span className="popover-title">{this.props.title}</span>
                </div>
            );
        }

        return (
            <div className="popover-header">
                {this.props.children}
            </div>
        );
    }
});

const PopoverControl =  React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        onClick:  React.PropTypes.func
    },

    render() {
        const { onClick } = this.props;

        return (
            <Link className="control" onClick={onClick}>
                {this.props.children}
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
module.exports.Container = PopoverContainer;
module.exports.Control   = PopoverControl;
module.exports.Controls  = PopoverControls;
