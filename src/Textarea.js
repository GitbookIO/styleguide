var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');

var Textarea = React.createClass({
    propTypes: {
        onChange:     React.PropTypes.func,
        name:         React.PropTypes.string,
        placeholder:  React.PropTypes.string,
        disabled:     React.PropTypes.bool,
        autoFocus:    React.PropTypes.bool,
        size:         React.PropTypes.oneOf(SIZES),
        rows:         React.PropTypes.string,
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
        this.refs.textarea.focus();
    },

    getDefaultProps: function() {
        return {
            size: SIZES[0],
            rows: 3
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
        var placeholder  = this.props.placeholder;
        var size         = this.props.size;
        var autoFocus    = this.props.autoFocus;
        var value        = this.props.value;
        var defaultValue = this.props.defaultValue;
        var rows         = this.props.rows;

        var className = classNames('form-control', 'input-' + size, this.props.className);

        return <textarea ref="textarea"
            className={className} rows={rows}
            autoFocus={autoFocus} disabled={disabled}
            name={name} value={value} defaultValue={defaultValue}
            placeholder={placeholder} onChange={this.onChange}></textarea>;
    }
});

module.exports = Textarea;
