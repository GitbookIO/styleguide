var React = require('react');
var classNames = require('classnames');

var STYLES = require('./STYLES');

var Badge = React.createClass({
    propTypes: {
        style: React.PropTypes.oneOf(STYLES),
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            style: STYLES[0]
        };
    },

    render() {
        var style     = this.props.style;
        var className = classNames('badge', 'badge-' + style, this.props.className);

        return (
            <span className={className}>
                {this.props.children}
            </span>
        );
    }
});

/**
 * Create a style for badges
 * @param {String} style
 * @return {React.Component}
 */
function createBadgeStyle(style) {
    return React.createClass({
        displayName: Badge.displayName + style,
        render() {
            return <Badge {...this.props} style={style.toLowerCase()} />;
        }
    });
}

module.exports         = Badge;
module.exports.Info    = createBadgeStyle('Info');
module.exports.Danger  = createBadgeStyle('Danger');
module.exports.Success = createBadgeStyle('Success');
module.exports.Warning = createBadgeStyle('Warning');
