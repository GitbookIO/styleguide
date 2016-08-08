var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');
var DIRECTIONS = [
    'left',
    'right'
];

var Checkbox = React.createClass({

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

    getDefaultProps: function() {
        return {
            displaySwitch: true,
            size:          SIZES[0],
            direction:     DIRECTIONS[0]
        };
    },

    render: function() {
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
                    {displaySwitch? <span /> : null}
                    {children}
                </label>
            </div>
        );
    }
});

module.exports = Checkbox;
