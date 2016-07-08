var React = require('react');
var classNames = require('classnames');

var Container = React.createClass({
    propTypes: {
        fluid: React.PropTypes.bool
    },

    render: function() {
        var className = classNames('container', {
            'container-fluid': this.props.fluid
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Container;
