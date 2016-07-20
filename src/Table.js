var React = require('react');
var classNames = require('classnames');

var Table = React.createClass({
    propTypes: {
        bordered: React.PropTypes.bool,
        className: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            bordered: false,
            className: ''
        };
    },

    render: function() {
        var className = classNames(
            'table',
            { 'table-bordered': this.props.bordered },
            this.props.className
        );

        return <table className={className}>
            {this.props.children}
        </table>;
    }
});

module.exports = Table;
