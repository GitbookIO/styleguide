const React = require('react');
const classNames = require('classnames');

const Container = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        children:  React.PropTypes.node,
        // No hoz padding
        fluid:     React.PropTypes.bool,
        // Take all the width
        maxWidth:  React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            maxWidth: false,
            fluid: false
        };
    },

    render() {
        let { fluid, className, maxWidth, ...props } = this.props;

        className = classNames('container', {
            'container-fluid': fluid,
            'container-max-width': maxWidth
        }, className);

        return (
            <div {...props} className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Container;
