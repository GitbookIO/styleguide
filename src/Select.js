var React      = require('react');
var classNames = require('classnames');

var SIZES        = require('./SIZES');
var Button       = require('./Button');
var Input        = require('./Input');

const DEFAULT_SEARCH_PLACEHOLDER = 'Search';
const itemShape = React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
]);

/**
 * Default filter for select
 */
function defaultFilter(query, item, i) {
    return true;
}

/**
 * Default render for options
 */
function defaultRenderOption(item, i) {
    return String(item);
}


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
        value:          React.PropTypes.oneOfType([
            itemShape,
            React.PropTypes.arrayOf(itemShape)
        ]),

        // List of items to display
        options:        React.PropTypes.arrayOf(itemShape),

        // Functions to render
        renderOption:    React.PropTypes.func,
        renderSelection: React.PropTypes.func,

        // Function to filter an element
        filter:         React.PropTypes.func,

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
            disabled:        false,
            search:          true,
            delimiter:       ',',
            size:            SIZES[0],
            multiple:        false,
            filter:          defaultFilter,
            renderOption:    defaultRenderOption,
            placeholder:     DEFAULT_SEARCH_PLACEHOLDER
        };
    },

    getInitialState: function() {
        var options = this.props.options;

        return {
            value:    this.props.value || options[0],
            query:    '',
            opened:   false
        };
    },

    componentWillReceiveProps: function(newProps) {
        this.setState({
            value: newProps.value,
            opened: newProps.disabled? false : this.state.opened
        });
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
     * Toggle an option
     */
    onToggleOption: function(value, e) {
        if (e) {
            e.preventDefault();
        }

        var acceptMultiple = this.props.multiple;
        var currentValue   = this.state.value;

        if (acceptMultiple) {
            var newValue = currentValue;

            // Add to selection if not yet selected
            if (!this.hasValue(value)) {
                newValue = currentValue.concat([value]);
            } else if (currentValue.length > 1) {
                // Unselect if many options are selected
                var removeIndex = newValue.indexOf(value);
                newValue.splice(removeIndex, 1);
            }

            this.setState({
                value: newValue
            });
        } else {
            this.setState({
                value:  value,
                opened: false
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
        var disabled        = this.props.disabled;
        var acceptMultiple  = this.props.multiple;
        var renderSelection = this.props.renderSelection || this.props.renderOption;
        var opened          = this.state.opened;
        var value           = this.state.value;
        var values          = acceptMultiple? value : [value];

        return (
            <Button size={this.props.size} disabled={disabled} active={opened} onClick={this.onToggle}>
                <span className="SelectSelections">
                {values.map(function(val, i) {
                    var inner = renderSelection(val, i);

                    return (
                        <span key={i} className="SelectSelection">
                            {inner}
                        </span>
                    );
                })}
                </span>
                <span className="caret"></span>
            </Button>
        );
    },

    /**
     * Render button to open select
     */
    renderSearch: function() {
        var query = this.state.query;

        return (
            <div className="SelectSearch">
                <Input ref="searchInput" value={query} onChange={this.onSearchChanged} placeholder={this.props.placeholder} />
            </div>
        );
    },


    /**
     * Render the options selector
     */
    renderOptions: function() {
        var query        = this.state.query;
        var opened       = this.state.opened;
        var options      = this.props.options;
        var renderOption = this.props.renderOption;
        var search       = this.props.search;
        var filter       = this.props.filter;

        var className = classNames('SelectContainer', {
            'open': opened
        });

        return (
            <div className={className}>
                {search? this.renderSearch() : ''}
                <div className="SelectOptions">
                    {options.map(function(item, i) {
                        if (!filter(query, item, i)) {
                            return '';
                        }

                        var inner = renderOption(item, i);
                        var isSelected = this.hasValue(item);
                        var onClick = this.onToggleOption.bind(this, item);

                        return (
                            <div key={i} className={classNames('SelectOption', { active: isSelected})} onClick={onClick}>
                                {inner}
                            </div>
                        );
                    }, this)}
                </div>
            </div>
        );
    },

    render: function() {
        var name     = this.props.name;
        var opened = this.state.opened;

        return <div className="SelectFormControl">
            <input type="hidden" name={name} value={this.getStringValue()} />
            {this.renderButton()}
            {opened? this.renderOptions() : ''}
        </div>;
    }
});

module.exports = Select;
