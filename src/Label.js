var React = require('react');
var classNames = require('classnames');

var STYLES = require('./STYLES');

var Label = React.createClass({
    propTypes: {
        style: React.PropTypes.oneOf(STYLES)
    },

    getDefaultProps: function() {
        return {
            style: STYLES[0]
        };
    },

    render: function() {
        var style     = this.props.style;
        var className = classNames('label', 'label-' + style, this.props.className);

        return (
            <span className={className}>
                {this.props.children}
            </span>
        );
    }
});

/**
 * Create a style for labels
 * @param {String} style
 * @return {React.Component}
 */
function createLabelStyle(style) {
    return React.createClass({
        displayName: Label.displayName + style,
        render: function() {
            return <Label {...this.props} style={style.toLowerCase()} />;
        }
    });
}

module.exports         = Label;
module.exports.Info    = createLabelStyle('Info');
module.exports.Danger  = createLabelStyle('Danger');
module.exports.Success = createLabelStyle('Success');
module.exports.Warning = createLabelStyle('Warning');
