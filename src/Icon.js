var React = require('react');

var Icon = React.createClass({
    propTypes: {
        id:   React.PropTypes.string,
        type: React.PropTypes.string
    },

    render: function() {
        var type      = this.props.type || 'octicon';
        var id        = this.props.id;
        var className = this.props.className;

        if (!className) {
            className = className + ' ' + type + '-' + id;
        }

        return <i className={className}></i>;
    }
});

module.exports = Icon;
