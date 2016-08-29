const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');
const DIRECTIONS = [
    'left',
    'right'
];

const Checkbox = React.createClass({

    propTypes: {
        children:        React.PropTypes.node,
        checked:         React.PropTypes.bool,
        defaultChecked:  React.PropTypes.bool,
        onChange:        React.PropTypes.func,
        name:            React.PropTypes.string,
        disabled:        React.PropTypes.bool,
        displaySwitch:   React.PropTypes.bool,
        size:            React.PropTypes.oneOf(SIZES),
        direction:       React.PropTypes.oneOf(DIRECTIONS)
    },

    getDefaultProps() {
        return {
            displaySwitch: true,
            size:          SIZES[0],
            direction:     DIRECTIONS[0]
        };
    },

    onSwitchClick(event) {
        event.stopPropagation();
        this.refs.checkbox.click();
    },

    render() {
        const {size, displaySwitch, direction, children, ...props } = this.props;

        const className = classNames('checkbox', 'switch-' + size, 'switch-' + direction, {
            'checkbox-switch': displaySwitch
        });

        return (
            <div className={className}>
                <label htmlFor={this.props.name}>
                    <input
                        ref="checkbox"
                        type="checkbox"
                        {...props}
                    />
                    {displaySwitch? <span onClick={this.onSwitchClick} /> : null}
                    <div className="checkbox-inline-label" onClick={this.onSwitchClick}>{children}</div>
                </label>
            </div>
        );
    }
});

module.exports = Checkbox;
