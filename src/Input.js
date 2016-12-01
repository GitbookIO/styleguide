const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');

const Input = React.createClass({
    propTypes: {
        className:    React.PropTypes.string,
        onChange:     React.PropTypes.func,
        onFocus:      React.PropTypes.func,
        onBlur:       React.PropTypes.func,
        onPaste:      React.PropTypes.func,
        onKeyDown:    React.PropTypes.func,
        onClick:      React.PropTypes.func,
        name:         React.PropTypes.string,
        type:         React.PropTypes.string,
        placeholder:  React.PropTypes.string,
        disabled:     React.PropTypes.bool,
        focus:        React.PropTypes.bool,
        readOnly:     React.PropTypes.bool,
        autoFocus:    React.PropTypes.bool,
        size:         React.PropTypes.oneOf(SIZES),
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
        this.refs.input.focus();
    },
    blur() {
        this.refs.input.blur();
    },

    getDefaultProps() {
        return {
            type: 'text',
            size: SIZES[0]
        };
    },

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    render() {
        const { onPaste, onBlur, onFocus, onKeyDown, onClick, value, readOnly, defaultValue,
            size, autoFocus, placeholder, type, focus,
            name, disabled } = this.props;

        const className = classNames('form-control', 'input-' + size, this.props.className, {
            focus
        });

        return (
            <input
                ref="input"
                type={type}
                autoFocus={autoFocus}
                className={className}
                disabled={disabled}
                readOnly={readOnly}
                name={name}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                onClick={onClick}
                onPaste={onPaste}
                onChange={this.onChange}
            />
        );
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
        render() {
            return <Input {...this.props} type={type.toLowerCase()} />;
        }
    });
}

const InputGroup = React.createClass({
    propTypes: {
        children:  React.PropTypes.node,
        className: React.PropTypes.string
    },

    render() {
        const className = classNames('input-group', this.props.className || []);
        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

const InputGroupAddon = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <span {...this.props} className="input-group-addon">
                {this.props.children}
            </span>
        );
    }
});

module.exports            = Input;
module.exports.Email      = createInputType('Email');
module.exports.Password   = createInputType('Password');
module.exports.Group      = InputGroup;
module.exports.GroupAddon = InputGroupAddon;
