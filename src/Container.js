const React = require('react');
const classNames = require('classnames');

const Container = React.createClass({
    propTypes: {
        className:  React.PropTypes.string,
        children: React.PropTypes.node,
        fluid: React.PropTypes.bool
    },

    render: function() {
        let { fluid, className, ...props } = this.props;
        className = classNames('container', {
            'container-fluid': fluid
        }, className);

        return (
            <div {...props} className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Container;
