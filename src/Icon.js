var React = require('react');

var Icon = React.createClass({
    propTypes: {
        id:   React.PropTypes.string,
        type: React.PropTypes.string,
        className: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            type: 'octicon'
        };
    },

    render: function() {
        var type      = this.props.type;
        var id        = this.props.id;
        var className = this.props.className;

        if (!className) {
            className = type + ' ' + type + '-' + id;
        }

        return <i className={className}></i>;
    }
});

module.exports = Icon;
