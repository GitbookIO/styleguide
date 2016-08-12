const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');
const AVATAR_SIZES = SIZES.concat(['button']);

const Avatar = React.createClass({
    propTypes: {
        src:       React.PropTypes.string,
        // No src fallbacks on text
        text:      React.PropTypes.string,
        size:      React.PropTypes.oneOf(AVATAR_SIZES),
        className: React.PropTypes.string,
        children:  React.PropTypes.node
    },

    render: function() {
        let { src, size, className, text, children } = this.props;
        className = classNames('avatar', size? 'avatar-' + size : '', className);

        return (
            <figure className={className} data-initial={text}>
                { src ? <img src={src} /> : null }
                {children}
            </figure>
        );
    }
});

const AvatarIcon = React.createClass({
    propTypes: {
        src: React.PropTypes.string,
        className: React.PropTypes.string
    },

    render: function() {
        let { src, className } = this.props;
        className = classNames('avatar-icon', className);

        return <img src={src} className={className} />;
    }
});

module.exports = Avatar;
module.exports.Icon = AvatarIcon;
