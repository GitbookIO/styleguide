const React = require('react');
const classNames = require('classnames');

const Icon = require('./Icon');
const STYLES = require('./STYLES');
const SIZES = require('./SIZES');

const BUTTONS_STYLES = STYLES.concat([
    'link',
    'text-link',
    'text-danger',
    'text-success',
    'text-warning',
    'count'
]);

const Button = React.createClass({
    propTypes: {
        className:      React.PropTypes.string,
        children:       React.PropTypes.node,
        type:           React.PropTypes.string,
        size:           React.PropTypes.oneOf(SIZES),
        style:          React.PropTypes.oneOf(BUTTONS_STYLES),
        // Makes a link button
        href:           React.PropTypes.string,
        // Form button
        value:          React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool,
            React.PropTypes.number
        ]),
        name:           React.PropTypes.string,
        // For links
        target:         React.PropTypes.string,
        filled:         React.PropTypes.bool,
        noBorder:       React.PropTypes.bool,
        disabled:       React.PropTypes.bool,
        active:         React.PropTypes.bool,
        block:          React.PropTypes.bool,
        dropdownToggle: React.PropTypes.bool,
        onClick:        React.PropTypes.func,
        title:          React.PropTypes.string,
        icon:           React.PropTypes.string,
        onNativeClick:  React.PropTypes.func
    },

    getDefaultProps() {
        return {
            style:    'default',
            size:     'md',
            type:     'button',
            filled:   false,
            disabled: false,
            active:   false
        };
    },

    onClick(e) {
        const { clicked } = this.state;

        if (this.props.onClick) {
            this.props.onClick();
        }

        if (!this.isFormButton() || clicked) {
            this.setState({
                clicked: false
            });

            return;
        }

        // Handle PJAX type form, where we need to have the value as an input
        this.setState({
            clicked: true
        }, () => {
            this.refs.button.click();
        });
    },

    isFormButton() {
        const { type, name } = this.props;
        return type === 'submit' && name;
    },

    render() {
        const { clicked } = this.state;
        let { title, icon, filled, block, noBorder, active, dropdownToggle,
            style, size, className, children, name, value,
            onNativeClick, onClick, ...props } = this.props;


        let inner = icon ? <Icon className={icon} /> : '';

        props.className = classNames(
            'btn', 'btn-' + style, 'btn-' + size,
            className, {
                'btn-fill':        filled,
                'btn-block':       block,
                'btn-noborder':    noBorder,
                active,
                'dropdown-toggle': dropdownToggle,
                'tooltipped':      Boolean(title)
            }
        );
        props['aria-label'] = title;
        props.role          = 'button';
        props.onClick       = onNativeClick ? onNativeClick : onClick;

        let input;

        if (clicked && this.isFormButton()) {
            input = <input type="hidden" name={name} value={value} />;
        }

        if (props.href) {
            delete props.type;
            return <a {...props}>{inner} {children}</a>;
        } else {
            return <button {...props}>{inner} {children}{input}</button>;
        }
    }
});

const ButtonGroup = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        children:  React.PropTypes.node,
        pull:      React.PropTypes.string,
        block:     React.PropTypes.bool
    },

    render() {
        let { className, pull, children, block } = this.props;

        className = classNames(
            'btn-group',
            className,
            pull ? 'pull-' + pull : '',
            {
                'btn-group-block': block
            }
        );

        return <div className={className}>{children}</div>;
    }
});

const ButtonToolbar = React.createClass({
    propTypes: {
        className:  React.PropTypes.string,
        children: React.PropTypes.node
    },

    render() {
        return <div className={'btn-toolbar ' + (this.props.className || '')}>{this.props.children}</div>;
    }
});

const ButtonCaret = React.createClass({
    render() {
        return <span className="caret" />;
    }
});

module.exports         = Button;
module.exports.Group   = ButtonGroup;
module.exports.Toolbar = ButtonToolbar;
module.exports.Caret   = ButtonCaret;
module.exports.STYLES  = BUTTONS_STYLES;
