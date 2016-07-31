var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');

var Spinner = React.createClass({
    propTypes: {
        centered: React.PropTypes.bool,
        size:     React.PropTypes.oneOf(SIZES)
    },

    getDefaultProps: function() {
        return {
            centered: true,
            size: 'md'
        };
    },

    render: function() {
        var className = classNames('gb-spinner', 'spinner-' + this.props.size, {
            'spinner-inverse':  this.props.inverse,
            'spinner-centered': this.props.centered
        });

        return <div className={className}></div>;
    }
});

module.exports = Spinner;

