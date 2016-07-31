var React = require('react');
var classNames = require('classnames');

var Form = React.createClass({
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

var FormGroup = React.createClass({
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
        var className = classNames('form-group', {
            'has-error': this.props.error
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

var FormHelpBlock = React.createClass({
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

module.exports           = Form;
module.exports.Group     = FormGroup;
module.exports.HelpBlock = FormHelpBlock;
