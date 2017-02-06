const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');

const Textarea = React.createClass({
    propTypes: {
        onChange:     React.PropTypes.func,
        name:         React.PropTypes.string,
        className:    React.PropTypes.string,
        placeholder:  React.PropTypes.string,
        disabled:     React.PropTypes.bool,
        autoFocus:    React.PropTypes.bool,
        size:         React.PropTypes.oneOf(SIZES),
        rows:         React.PropTypes.number,
        maxLength:    React.PropTypes.number,
        defaultValue: React.PropTypes.string,
        value:        React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ])
    },

    /*
        APIs for parent component
     */
    focus() {
        this.refs.textarea.focus();
    },
    blur() {
        this.refs.textarea.blur();
    },

    getDefaultProps() {
        return {
            size: SIZES[0],
            rows: 3
        };
    },

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    render() {
        const {
            disabled, name, placeholder, size, rows,
            autoFocus, value, defaultValue, maxLength
        } = this.props;


        const className = classNames('form-control', 'input-' + size, this.props.className);

        return (<textarea ref="textarea"
            className={className} rows={rows} maxLength={maxLength}
            autoFocus={autoFocus} disabled={disabled}
            name={name} value={value} defaultValue={defaultValue}
            placeholder={placeholder} onChange={this.onChange}></textarea>);
    }
});

module.exports = Textarea;
