var React = require('react');
var classNames = require('classnames');

var Icon = require('./Icon');
var Container = require('./Container');
var STYLES = require('./STYLES');

var Alert = React.createClass({
    propTypes: {
        onClose:  React.PropTypes.func,
        closable: React.PropTypes.bool,
        style:    React.PropTypes.oneOf(STYLES)
    },

    getInitialState: function() {
        return {
            opened: true
        };
    },

    getDefaultProps: function() {
        return {
            onClose: undefined,
            closable: false,
            style: STYLES[0]
        };
    },

    onClose: function(e) {
        e.preventDefault();
        var onClose = this.props.onClose;

        this.setState({
            opened: false
        }, function() {
            if (onClose) onClose();
        });
    },

    render: function() {
        var style     = this.props.style;
        var className = classNames('alert', 'alert-' + style, this.props.className);
        var onClose   = this.props.onClose;
        var closable  = this.props.closable;
        var inner;

        if (!this.state.opened) {
            return <div />;
        }

        if (onClose || closable) {
            inner = <a href="#" onClick={this.onClose} className="alert-btn"><Icon id="x" /></a>;
        }

        return (
            <div className={className}>
                <Container>
                {inner}
                {this.props.children}
                </Container>
            </div>
        );
    }
});

var AlertButton = React.createClass({
    onClick: function(e) {
        if (this.props.onClick) {
            e.preventDefault();
            this.props.onClick();
        }
    },

    render: function() {
        var { href, className } = this.props;
        className = classNames('alert-btn', className || '');
        href = href || '#';

        return (
            <a className={className} href={href} onClick={this.onClick}>{this.props.children}</a>
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
        displayName: Alert.displayName + style,
        render: function() {
            return <Alert {...this.props} style={style.toLowerCase()} />;
        }
    });
}

module.exports         = Alert;
module.exports.Button  = AlertButton;
module.exports.Info    = createAlertStyle('Info');
module.exports.Danger  = createAlertStyle('Danger');
module.exports.Success = createAlertStyle('Success');
module.exports.Warning = createAlertStyle('Warning');
