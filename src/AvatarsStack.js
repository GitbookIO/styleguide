const React = require('react');

/**
 * An item in the stack
 * @type {ReactClass}
 */
const AvatarsStackItem = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        const { children } = this.props;

        return (
            <div className="AvatarsStack-Item">
                {children}
            </div>
        );
    }
});

/**
 * Stack of avatars to display a list of participants.
 * @type {ReactClass}
 */
const AvatarsStack = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },
    statics: {
        Item: AvatarsStackItem
    },

    render() {
        const { children } = this.props;

        return (
            <div className="AvatarsStack">
                {children}
            </div>
        );
    }
});

module.exports = AvatarsStack;
