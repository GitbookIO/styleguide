const React      = require('react');
const classNames = require('classnames');

const SIZES        = require('./SIZES');
const Button       = require('./Button');
const Input        = require('./Input');

const DEFAULT_SEARCH_PLACEHOLDER = 'Search';

const itemShape = React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
]);

const groupShape = React.PropTypes.shape({
    label:   React.PropTypes.string,
    options: React.PropTypes.arrayOf(itemShape)
});

/**
 * Default filter for select
 */
function defaultFilter(query, item, i) {
    return true;
}

/**
 * Default render for options
 */
function defaultComponent({option}) {
    return <span>{option}</span>;
}
defaultComponent.propTypes = {
    option: itemShape
};

/**
 * Default render to string for input
 */
function defaultRenderToString(item, i) {
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
        groups:         React.PropTypes.arrayOf(groupShape),
        options:        React.PropTypes.arrayOf(itemShape),

        // Function to render the option to a string or element
        component:     React.PropTypes.func,

        // Function to render the selected option in the button
        // Defaults to "renderOption"
        componentSelection: React.PropTypes.func,

        // Function to output an option as a string
        // Defaults to a string representation, you have to provide your own value
        // when using a custom option renderer
        renderToString:  React.PropTypes.func,

        // Function to filter an element
        filter:         React.PropTypes.func,

        // Optional callback when value changed
        onChange:       React.PropTypes.func,

        // Name when using server posting
        name:           React.PropTypes.string,

        // Text to display when no value is set
        placeholder:    React.PropTypes.string,
        searchPlaceholder: React.PropTypes.string,

        // Delimiter for multiple values
        delimiter:      React.PropTypes.string,

        // Prevent selection
        disabled:       React.PropTypes.bool,

        // Display the search filter?
        search:         React.PropTypes.bool,

        // Accept multiple values
        multiple:       React.PropTypes.bool,

        // Size of the select to display
        size:           React.PropTypes.oneOf(SIZES),

        // Take the whole width
        block:          React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            disabled:          false,
            search:            true,
            delimiter:         ',',
            size:              SIZES[0],
            multiple:          false,
            block:             false,
            filter:            defaultFilter,
            component:         defaultComponent,
            renderToString:    defaultRenderToString,
            searchPlaceholder: DEFAULT_SEARCH_PLACEHOLDER,
            placeholder:       'Select'
        };
    },

    getInitialState: function() {
        return {
            value:    this.props.value,
            query:    '',
            opened:   false,
            groups:   this.propsToGroups(this.props)
        };
    },

    componentWillReceiveProps: function(newProps) {
        this.setState({
            value:  newProps.value,
            groups: this.propsToGroups(newProps),
            opened: newProps.disabled? false : this.state.opened
        });
    },

    /**
     * Create list of groups from props
     * @param {Object} props
     * @return {Array<groupShape>}
     */
    propsToGroups: function(props) {
        var options = this.props.options;
        var groups = this.props.groups;

        if (groups) {
            return groups;
        }

        return [
            { options: options }
        ];
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
     * Close the select
     */
    close: function() {
        this.setState({
            opened: false
        });
    },

    /**
     * Open the select
     */
    open: function() {
        this.setState({
            opened: false
        });
    },

    /**
     * Bind a random click in the window to close the dropdown
     */
    bindWindowClick: function() {
        if (this.state.opened) {
            this.focusSearch();
            window.addEventListener('click', this.close);
        } else {
            window.removeEventListener('click', this.close);
        }
    },

    componentDidUpdate: function() {
        this.bindWindowClick();
    },

    componentDidMount: function() {
        this.bindWindowClick();
    },

    componentWillUnmount: function() {
        window.removeEventListener('click', this.close);
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
     * Get current value as a string (for hidden input)
     * @return {String}
     */
    getStringValue: function() {
        var value = this.state.value;
        var renderToString = this.props.renderToString;

        if (!value) {
            return '';
        }

        if (!this.props.multiple) {
            return renderToString(value);
        } else {
            return value
                .map(renderToString)
                .join(this.props.delimiter);
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
        let { disabled, block, multiple, placeholder } = this.props;
        let { value, opened } = this.state;
        let ComponentSelection = this.props.componentSelection || this.props.component;

        var inner;

        if (value) {
            var values = multiple? value : [value];
            inner      = (
                <span className="SelectSelections">
                {values.map(function(val, i) {
                    var inner = <ComponentSelection option={val} index={i} />;

                    return (
                        <span key={i} className="SelectSelection">
                            {inner}
                        </span>
                    );
                })}
                </span>
            );
        } else {
            inner = <span className="SelectPlaceholder">{placeholder}</span>;
        }

        return (
            <Button size={this.props.size} block={block} disabled={disabled} active={opened} onClick={this.onToggle}>
                {inner} <Button.Caret />
            </Button>
        );
    },

    /**
     * Render button to open select
     */
    renderSearch: function() {
        let { query } = this.state;

        return (
            <div className="SelectSearch">
                <Input ref="searchInput"
                    value={query}
                    onChange={this.onSearchChanged}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    },

    /**
     * Render the options selector
     */
    renderGroup: function(group, index) {
        let { query } = this.state;
        let { filter } = this.props;
        let Component = this.props.component;
        var count     = 0;

        var options = group.options.map(function(item, i) {
            if (!filter(query, item, i)) {
                return '';
            }

            count++;

            var inner = <Component option={item} index={i} />;
            var isSelected = this.hasValue(item);
            var onClick = this.onToggleOption.bind(this, item);

            return (
                <div key={i} className={classNames('SelectOption', { active: isSelected})} onClick={onClick}>
                    {inner}
                </div>
            );
        }, this);

        // Don't display empty groups (when filtered)
        if (count === 0) {
            return '';
        }

        return (
            <div key={index} className="SelectOptGroup">
                {group.label? <div className="GroupLabel">{group.label}</div> : ''}
                <div className="GroupOptions">
                    {options}
                </div>
            </div>
        );
    },

    /**
     * Render the groups
     */
    renderGroups: function() {
        var opened = this.state.opened;
        var groups = this.state.groups;
        var search = this.props.search;

        var className = classNames('SelectContainer', {
            'open': opened
        });

        return (
            <div className={className}>
                {search? this.renderSearch() : ''}
                <div className="SelectGroups">
                    {groups.map(this.renderGroup)}
                </div>
            </div>
        );
    },

    render: function() {
        let { name, block } = this.props;
        let { opened } = this.state;

        let className = classNames('SelectFormControl', {
            'block': block
        });

        return <div className={className} onClick={e => e.stopPropagation()}>
            <input type="hidden" name={name} value={this.getStringValue()} />
            {this.renderButton()}
            {opened? this.renderGroups() : ''}
        </div>;
    }
});

module.exports = Select;
