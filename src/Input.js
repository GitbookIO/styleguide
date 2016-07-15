var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');

var Input = React.createClass({
    propTypes: {
        onChange:     React.PropTypes.func,
        name:         React.PropTypes.string,
        type:         React.PropTypes.string,
        placeholder:  React.PropTypes.string,
        disabled:     React.PropTypes.bool,
        autoFocus:    React.PropTypes.bool,
        size:         React.PropTypes.oneOf(SIZES),
        defaultValue: React.PropTypes.string,
        value:        React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ])
    },

    /**
     * Focus this input
     */
    focus: function() {
        this.refs.input.focus();
    },

    getDefaultProps: function() {
        return {
            type: 'text',
            size: SIZES[0]
        };
    },

    onChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    render: function() {
        var disabled     = this.props.disabled;
        var name         = this.props.name;
        var type         = this.props.type;
        var placeholder  = this.props.placeholder;
        var size         = this.props.size;
        var autoFocus    = this.props.autoFocus;
        var value        = this.props.value;
        var defaultValue = this.props.defaultValue;

        var className = classNames('form-control', 'input-' + size, this.props.className);

        return <input ref="input"
            type={type} autoFocus={autoFocus}
            className={className} disabled={disabled}
            name={name} value={value} defaultValue={defaultValue}
            placeholder={placeholder} onChange={this.onChange} />;
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
