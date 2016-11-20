const React = require('react');
const classNames = require('classnames');

/**
 * Title (text) of the card
 * @type {ReactClass}
 */
const CardTitle = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        const { children } = this.props;

        return (
            <h2 className="CardTitle">
                {children}
            </h2>
        );
    }
});

/**
 * Small icon to indicate a type/flag on the card.
 * @type {ReactClass}
 */
const CardFlag = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        style:    React.PropTypes.string
    },

    render() {
        const { children, style } = this.props;
        const className = classNames('CardFlag', `style-${style}`);

        return (
            <span className={className}>
                {children}
            </span>
        );
    }
});

/**
 * Container for the title of the card.
 * @type {ReactClass}
 */
const CardHeading = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        title:    React.PropTypes.string
    },

    render() {
        let { children, title } = this.props;

        if (title) {
            children = <CardTitle>{title}</CardTitle>;
        }

        return (
            <div className="CardHeading">
                {children}
            </div>
        );
    }
});

/**
 * Container for the inner text and description of the card.
 * @type {ReactClass}
 */
const CardBody = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        const { children } = this.props;

        return (
            <div className="CardBody">
                {children}
            </div>
        );
    }
});

/**
 * Container for the actions of the card.
 * It prevent the propagation of clicks to the card itself.
 *
 * @type {ReactClass}
 */
const CardActions = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    onClick(event) {
        event.stopPropgation();
    },

    render() {
        const { children } = this.props;

        return (
            <div className="CardActions" onClick={this.onClick}>
                {children}
            </div>
        );
    }
});

/**
 * Container for the card.
 * @type {ReactClass}
 */
const Card = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        href:     React.PropTypes.string,
        onClick:  React.PropTypes.func
    },
    statics: {
        Body:    CardBody,
        Heading: CardHeading,
        Title:   CardTitle,
        Actions: CardActions,
        Flag:    CardFlag
    },

    onClick(event) {
        const { onClick, href } = this.props;

        if (href) {
            event.stopPropgation();
            event.preventDefault();

            window.location.href = href;
        } else {
            onClick(event);
        }
    },

    render() {
        const { children } = this.props;

        return (
            <div className="Card" onClick={this.onClick}>
                {children}
            </div>
        );
    }
});


module.exports = Card;
