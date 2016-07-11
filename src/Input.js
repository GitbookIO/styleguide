var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');

var Input = React.createClass({
    propTypes: {
        onChange:    React.PropTypes.func,
        name:        React.PropTypes.string,
        type:        React.PropTypes.string,
        placeholder: React.PropTypes.string,
        disabled:    React.PropTypes.bool,
        size:        React.PropTypes.oneOf(SIZES),
        value:       React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ])
    },

    getInitialState: function() {
        return {
            value: this.props.value
        };
    },

    getDefaultProps: function() {
        return {
            type: 'text',
            size: SIZES[0]
        };
    },

    componentWillReceiveProps: function(newProps) {
        this.setState({
            value: newProps.value
        });
    },

    onChange: function(e) {
        var newValue = e.target.value;

        this.setState({
            value: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    },

    render: function() {
        var disabled    = this.props.disabled;
        var name        = this.props.name;
        var type        = this.props.type;
        var placeholder = this.props.placeholder;
        var size        = this.props.size;
        var value       = this.state.value;

        var className = classNames('form-control', 'input-' + size, this.props.className);

        return <input type={type} className={className} disabled={disabled} name={name} value={value} placeholder={placeholder} onChange={this.onChange} />;
    }
});


/**
 * Create a style of alert
 * @param {String} style
 * @return {React.Component}
 */
function createInputType(type) {
    return React.createClass({
        displayName: Input.displayName + type,
        render: function() {
            return <Input {...this.props} type={type.toLowerCase()} />;
        }
    });
}

module.exports          = Input;
module.exports.Email    = createInputType('Email');
module.exports.Password = createInputType('Password');
