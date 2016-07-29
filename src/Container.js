var React = require('react');
var classNames = require('classnames');

var Container = React.createClass({
    propTypes: {
        className:  React.PropTypes.string,
        children: React.PropTypes.node,
        fluid: React.PropTypes.bool
    },

    render: function() {
        var className = classNames('container', {
            'container-fluid': this.props.fluid
        }, this.props.className);

        return (
            <div {...this.props} className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Container;
