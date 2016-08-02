const React = require('react');
const classNames = require('classnames');

const Form = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    submit: function() {
        this.refs.form.submit();
    },

    render: function() {
        return (
            <form ref="form" {...this.props}>
                {this.props.children}
            </form>
        );
    }
});

const FormGroup = React.createClass({
    propTypes: {
        error: React.PropTypes.bool,
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    getDefaulProps: function() {
        return {
            error: false
        };
    },

    render: function() {
        let className = classNames('form-group', {
            'has-error': this.props.error
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

const FormHelpBlock = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <p className="help-block">
                {this.props.children}
            </p>
        );
    }
});

const FormCheckbox = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        name:     React.PropTypes.string
    },

    onClick: function() {
        this.refs.checkbox.click();
    },

    render: function() {
        let {children, ...props } = this.props;

        return (
            <div className="checkbox">
                <label htmlFor={this.props.name} onClick={this.onClick}>
                    <input ref="checkbox" type="checkbox" {...props} /> {children}
                </label>
            </div>
        );
    }
});

module.exports           = Form;
module.exports.Group     = FormGroup;
module.exports.Checkbox  = FormCheckbox;
module.exports.HelpBlock = FormHelpBlock;
