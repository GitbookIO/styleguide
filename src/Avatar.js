var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');
var AVATAR_SIZES = SIZES.concat(['button']);

var Avatar = React.createClass({
    propTypes: {
        src:  React.PropTypes.string.isRequired,
        size: React.PropTypes.oneOf(AVATAR_SIZES),
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    render: function() {
        var src = this.props.src;
        var size = this.props.size;
        var className = classNames('avatar', size? 'avatar-' + size : '', this.props.className);

        return (
            <figure className={className}>
                <img src={src} />
                {this.props.children}
            </figure>
        );
    }
});

module.exports = Avatar;
