var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');
var Button = require('./Button');
var Input = require('./Input');
var isServerSide = require('./isServerSide');


/**
 * Interractive select for forms
 *
 * It renders as a normal select on server and has a custom UI on browser (with search, images support).
 *
 * <Select name="test">
 *     <Select.Option key="en">English</Select.Option>
 *     <Select.Option key="fr">French</Select.Option>
 * </Select>
 */
var Select = React.createClass({
    propTypes: {
        // Current value of the select
        value:       React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.arrayOf(React.PropTypes.string)
        ]).isRequired,

        // Optional callback when value changed
        onChange:       React.PropTypes.func,

        // Name when using server posting
        name:           React.PropTypes.string,

        // Text to display when no value is set
        placeholder:    React.PropTypes.string,

        // Delimiter for multiple values
        delimiter:      React.PropTypes.string,

        // Prevent selection
        disabled:       React.PropTypes.bool,

        // Display the search filter?
        search:         React.PropTypes.bool,

        // Accept multiple values
        multiple:       React.PropTypes.bool,

        // Size of the select to display
        size:           React.PropTypes.oneOf(SIZES)
    },

    getDefaultProps: function() {
        return {
            disabled:  false,
            search:    true,
            delimiter: ',',
            size:      SIZES[0],
            multiple:  false
        };
    },

    getInitialState: function() {
        return {
            value:  this.props.value,
            query:  '',
            opened: false
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

    /**
     * Search query changed
     */
    onSearchChanged: function(e) {
        this.setState({
            query: e.target.value
        });
    },

    /**
     * Toggle (close/open) the select
     */
    onToggle: function() {
        this.setState({
            opened: !this.state.opened
        });
    },

    /**
     * Toggle (close/open) the select
     */
    onToggleOption: function(value, e) {
        if (e) {
            e.preventDefault();
        }

        var acceptMultiple = this.props.multiple;
        var currentValue   = this.state.value;

        if (acceptMultiple) {
            this.setState({
                value: currentValue.concat([value])
            });
        } else {
            this.setState({
                value: value
            });
        }
    },

    /**
     * Get current value as a string
     * @return {String}
     */
    getStringValue: function() {
        var value = this.state.value;

        if (!this.props.multiple) {
            return value;
        } else {
            return value.join(this.props.delimiter);
        }
    },

    /**
     * Check if a value is selected
     * @param {String} value
     * @return {Boolean}
     */
    hasValue: function(value) {
        var currentValue = this.state.value;

        if (!this.props.multiple) {
            return (currentValue === value);
        } else {
            return (currentValue.indexOf(value) >= 0);
        }
    },

    /**
     * Focus the search input
     */
    focusSearch: function() {
        var input = this.refs.searchInput;
        if (!input) {
            return;
        }

        input.focus();
    },

    /**
     * Render button to open select
     */
    renderButton: function() {
        var disabled = this.props.disabled;
        var opened = this.state.opened;

        return (
            <Button size={this.props.size} disabled={disabled} active={opened} onClick={this.onToggle}>

            </Button>
        );
    },

    /**
     * Render button to open select
     */
    renderSearch: function() {
        var query = this.state.query;

        return (
            <div className="select-search">
                <Input ref="searchInput" value={query} onChange={this.onSearchChanged} />
            </div>
        );
    },

    /**
     * Render the options selector
     */
    renderOptions: function() {
        var children;
        var search = this.props.search;

        children = React.Children.map(this.props.children, function(child) {
            var childValue = child.props.value;
            var className = classNames('select-option', {
                'active': this.hasValue(childValue)
            });

            return <div className={className} onClick={this.onToggleOption.bind(this, childValue)}>
                {child}
            </div>;
        }, this);

        return (
            <div className="select-container">
                {search? this.renderSearch() : ''}
                <div className="select-options">
                    {children}
                </div>
            </div>
        );
    },

    render: function() {
        var name     = this.props.name;
        var disabled = this.props.disabled;
        var opened = this.state.opened;

        if (isServerSide) {
            return (
                <select class="form-control" name={name} disabled={disabled}>
                    {this.props.children}
                </select>
            );
        }

        return <div className="select">
            <input type="hidden" value={this.getStringValue()} />
            {this.renderButton()}
            {opened? this.renderOptions() : ''}
        </div>;
    }
});

var SelectOption = React.createClass({
    propTypes: {
        value: React.PropTypes.string
    },

    render: function() {
        var value = this.props.value;

        if (isServerSide) {
            return <option value={value}>
                {this.props.children}
            </option>;
        }

        return <div className="select-option-inner">
            {this.props.children}
        </div>;
    }
});

module.exports        = Select;
module.exports.Option = SelectOption;
