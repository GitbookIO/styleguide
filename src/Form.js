var React = require('react');
var classNames = require('classnames');

var Form = React.createClass({
    render: function() {
        return (
            <form>
                {this.props.children}
            </form>
        );
    }
});

var FormGroup = React.createClass({
    propTypes: {
        error: React.PropTypes.bool
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
