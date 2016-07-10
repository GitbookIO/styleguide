var React = require('react');
var classNames = require('classnames');

var Icon = require('./icon');
var STYLES = require('./STYLES');

var Alert = React.createClass({
    propTypes: {
        onClose: React.PropTypes.func,
        style:   React.PropTypes.oneOf(STYLES)
    },

    getInitialState: function() {
        return {
            opened: true
        };
    },

    getDefaultProps: function() {
        return {
            style: STYLES[0]
        };
    },

    onClose: function(e) {
        e.preventDefault();
        var onClose = this.props.onClose;

        this.setState({
            opened: false
        }, function() {
            onClose();
        });
    },

    render: function() {
        var style     = this.props.style;
        var className = classNames('alert', 'alert-' + style, this.props.className);
        var onClose = this.props.onClose;
        var inner;

        if (!this.state.opened) {
            return <div />;
        }

        if (onClose) {
            inner = <a href="#" onClose={this.onClose} className="alert-btn"><Icon id="x" /></a>
        }

        return (
            <div className={className}>
                {this.props.children}
                {inner}
            </div>
        );
    }
});

/**
 * Create a style of alert
 * @param {String} style
 * @return {React.Component}
 */
function createAlertStyle(style) {
    return React.createClass({
        displayName: 'Alert' + style,
        render: function() {
            return <Alert {...this.props} style={style} />;
        }
    });
}

module.exports         = Alert;
module.exports.Info    = createAlertStyle('info');
module.exports.Danger  = createAlertStyle('danger');
module.exports.Success = createAlertStyle('success');
module.exports.Warning = createAlertStyle('warning');

