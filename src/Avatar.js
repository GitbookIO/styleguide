var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');

var Avatar = React.createClass({
    propTypes: {
        src:  React.PropTypes.string.isRequired,
        size: React.PropTypes.oneOf(SIZES)
    },

    getDefaultProps: function() {
        return {
            size: 'md'
        };
    },

    render: function() {
        var src = this.props.src;
        var size = this.props.size;
        var className = classNames('avatar', 'avatar-' + size, this.props.className);

        return (
            <figure className={className}>
                <img src={src} />
                {this.props.children}
            </figure>
        );
    }
});

module.exports = Avatar;
