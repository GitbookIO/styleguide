const React = require('react');
const classNames = require('classnames');

/**
 * Main container for a form
 * @type {ReactClass}
 */
const Form = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    submit() {
        this.refs.form.submit();
    },

    render() {
        return (
            <form ref="form" {...this.props}>
                {this.props.children}
            </form>
        );
    }
});

/**
 * Container for an input, its label and help text.
 * @type {ReactClass}
 */
const FormGroup = React.createClass({
    propTypes: {
        error: React.PropTypes.bool,
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    getDefaulProps() {
        return {
            error: false
        };
    },

    render() {
        const className = classNames('form-group', {
            'has-error': this.props.error
        }, this.props.className);

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

/**
 * An help text for an input
 * @type {ReactClass}
 */
const FormHelpBlock = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <p className="help-block">
                {this.props.children}
            </p>
        );
    }
});

/**
 * Container for submit/cancel actions
 * @type {ReactClass}
 */
const FormActions = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="form-actions">
                {this.props.children}
            </div>
        );
    }
});

module.exports           = Form;
module.exports.Actions   = FormActions;
module.exports.Group     = FormGroup;
module.exports.HelpBlock = FormHelpBlock;
