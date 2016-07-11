var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');
var DIRECTIONS = [
    'left',
    'right'
];

var Checkbox = React.createClass({
    propTypes: {
        checked:       React.PropTypes.bool.isRequired,
        onChange:      React.PropTypes.func,
        name:          React.PropTypes.string,
        disabled:      React.PropTypes.bool,
        displaySwitch: React.PropTypes.bool,
        size:          React.PropTypes.oneOf(SIZES),
        direction:     React.PropTypes.oneOf(DIRECTIONS)
    },

    getDefaultProps: function() {
        return {
            checked:       false,
            displaySwitch: true,
            size:          SIZES[0],
            direction:     DIRECTIONS[0]
        };
    },

    getInitialState: function() {
        return {
            checked: this.props.checked
        };
    },

    componentWillReceiveProps: function(newProps) {
        this.setState({
            checked: newProps.checked
        });
    },

    onChange: function(e) {
        var newValue = e.target.value;

        this.setState({
            checked: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    },

    render: function() {
        var name      = this.props.name;
        var disabled  = this.props.disabled;
        var size      = this.props.size;
        var direction = this.props.direction;
        var checked   = this.state.checked;

        var className = classNames('checkbox', 'switch-' + size, 'switch-' + direction, {
            'checkbox-switch': this.props.displaySwitch
        });

        return (
            <div className={className}>
                <label>
                    <input type="checkbox" name={name} disabled={disabled} checked={checked} />
                    <span></span> {this.props.children}
                </label>
            </div>
        );
    }
});

module.exports = Checkbox;
