const React = require('react');
const classNames = require('classnames');

const Icon = require('./Icon');
const Container = require('./Container');
const STYLES = require('./STYLES');

const Alert = React.createClass({
    propTypes: {
        onClose:  React.PropTypes.func,
        closable: React.PropTypes.bool,
        style:    React.PropTypes.oneOf(STYLES),
        children: React.PropTypes.node,
        className: React.PropTypes.string
    },

    getInitialState() {
        return {
            opened: true
        };
    },

    getDefaultProps() {
        return {
            onClose: undefined,
            closable: false,
            style: STYLES[0]
        };
    },

    onClose(e) {
        e.preventDefault();
        const onClose = this.props.onClose;

        this.setState({
            opened: false
        }, () => {
            if (onClose) onClose();
        });
    },

    render() {
        const style     = this.props.style;
        const className = classNames('alert', 'alert-' + style, this.props.className);
        const onClose   = this.props.onClose;
        const closable  = this.props.closable;
        let inner;

        if (!this.state.opened) {
            return <div />;
        }

        if (onClose || closable) {
            inner = <a href="#" onClick={this.onClose} className="alert-btn"><Icon id="x" /></a>;
        }

        return (
            <div className={className}>
                <Container fluid>
                {inner}
                {this.props.children}
                </Container>
            </div>
        );
    }
});

const AlertButton = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        href: React.PropTypes.string,
        onClick:  React.PropTypes.func
    },

    onClick(e) {
        if (this.props.onClick) {
            e.preventDefault();
            this.props.onClick();
        }
    },

    render() {
        let { href, className } = this.props;
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
        render() {
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
