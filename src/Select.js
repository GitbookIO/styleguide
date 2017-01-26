const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');
const Button = require('./Button');
const Input = require('./Input');
const Backdrop = require('./Backdrop');

const DEFAULT_SEARCH_PLACEHOLDER = 'Search';

const itemShape = React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
]);

const groupShape = React.PropTypes.shape({
    label: React.PropTypes.string,
    options: React.PropTypes.arrayOf(itemShape)
});

/**
 * Default filter for select
 */
function defaultFilter(query, item, i) {
    return true;
}

/**
 * Default render to string for input
 */
function defaultRenderToString(item, i) {
    return String(item);
}

/**
 * Default render for options
 * @type {ReactClass}
 */
const DefaultComponent = React.createClass({
    propTypes: {
        option: itemShape
    },

    render() {
        const { option } = this.props;
        return (
            <span>{option}</span>
        );
    }
});

/**
 * Component to render a Selection option
 * @type {ReactClass}
 */
const SelectOption = React.createClass({
    propTypes: {
        item: itemShape.isRequired,
        index: React.PropTypes.number.isRequired,
        // Function to render the option to a string or element
        component: React.PropTypes.func.isRequired,
        // Function to check if option is in selected values
        hasValue: React.PropTypes.func.isRequired,
        // Toggle an option in main Select state
        onToggleOption: React.PropTypes.func.isRequired,
        // Should an option be marked as disabled
        isOptionDisabled: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            isOptionDisabled: () => false
        };
    },

    render() {
        const {
            item,
            index,
            isOptionDisabled,
            hasValue,
            onToggleOption,
            component: Component
        } = this.props;

        // Check if item should be displayed but marked as disabled
        const isDisabled = isOptionDisabled(item);

        const className = classNames('SelectOption', {
            active: hasValue(item),
            disabled: isDisabled
        });

        return (
            <div className={className}
                onClick={(e) => {
                    if (!isDisabled) {
                        onToggleOption(item);
                    }
                }}>
                <Component option={item} index={index} />
            </div>
        );
    }
});

/**
 * Component to render a Select option group
 * @type {ReactClass}
 */
const SelectOptGroup = React.createClass({
    propTypes: {
        group: groupShape
    },

    render() {
        const {
            group,
            ...props
        } = this.props;

        return (
            <div className="SelectOptGroup">
            {group.label ?
                <div className="GroupLabel">{group.label}</div>
                : null
            }
                <div className="GroupOptions">
                {group.options.map((item, i) => (
                    <SelectOption {...props} key={i} item={item} index={i} />
                ))}
                </div>
            </div>
        );
    }
});

/**
 * Interractive select for forms
 *
 * It renders as a normal select on server and has a custom UI on browser (with search, images support).
 *
 * <Select name="test" options=[] />
 */
const Select = React.createClass({
    propTypes: {
        // Current value of the select
        value: React.PropTypes.oneOfType([
            itemShape,
            React.PropTypes.arrayOf(itemShape)
        ]),

        // List of items to display
        groups: React.PropTypes.arrayOf(groupShape),
        options: React.PropTypes.arrayOf(itemShape),

        // Function to render the option to a string or element
        component: React.PropTypes.func,

        // Function to render a message when search did not return any results
        searchEmptyComponent: React.PropTypes.func,

        // Function to render the selected option in the button
        // Defaults to "renderOption"
        componentSelection: React.PropTypes.func,

        // Function to output an option as a string
        // Defaults to a string representation, you have to provide your own value
        // when using a custom option renderer
        renderToString: React.PropTypes.func,

        // Function to filter an element
        filter: React.PropTypes.func,

        // Optional callback when value changed
        onChange: React.PropTypes.func,

        // Name when using server posting
        name: React.PropTypes.string,

        // Text to display when no value is set
        placeholder: React.PropTypes.string,
        searchPlaceholder: React.PropTypes.string,

        // Delimiter for multiple values
        delimiter: React.PropTypes.string,

        // Prevent selection
        disabled: React.PropTypes.bool,

        // Display the search filter?
        search: React.PropTypes.bool,

        // Accept multiple values
        multiple: React.PropTypes.bool,

        // Size of the select to display
        size: React.PropTypes.oneOf(SIZES),

        // Take the whole width
        block: React.PropTypes.bool,

        // Should an option be marked as disabled
        isOptionDisabled: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            disabled: false,
            search: true,
            delimiter: ',',
            size: SIZES[0],
            multiple: false,
            block: false,
            filter: defaultFilter,
            component: DefaultComponent,
            renderToString: defaultRenderToString,
            searchPlaceholder: DEFAULT_SEARCH_PLACEHOLDER,
            placeholder: 'Select',
            searchEmptyComponent: null
        };
    },

    getInitialState() {
        return {
            value: this.props.value,
            query: '',
            opened: false,
            groups: this.propsToGroups(this.props)
        };
    },

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value,
            groups: this.propsToGroups(newProps),
            opened: newProps.disabled ? false : this.state.opened
        });
    },

    /**
     * Create list of groups from props
     * @param {Object} props
     * @return {Array<groupShape>}
     */
    propsToGroups(props) {
        const { options, groups } = props;

        if (groups) {
            return groups;
        }

        return [
            { options }
        ];
    },

    /**
     * Search query changed
     */
    onSearchChanged(e) {
        this.setState({
            query: e.target.value
        });
    },

    /**
     * Toggle (close/open) the select
     */
    onToggle() {
        this.setState({
            opened: !this.state.opened
        });
    },

    /**
     * Close the select
     */
    close() {
        this.setState({
            opened: false
        });
    },

    /**
     * Open the select
     */
    open() {
        this.setState({
            opened: false
        });
    },

    /**
     * Focus the search if open
     */
    focusOnOpen() {
        if (this.state.opened) {
            this.focusSearch();
        }
    },

    componentDidUpdate() {
        this.focusOnOpen();
    },

    componentDidMount() {
        this.focusOnOpen();
    },

    /**
     * Toggle an option
     */
    onToggleOption(addValue, e) {
        if (e) {
            e.preventDefault();
        }

        const { value, multiple } = this.state;
        const { onChange } = this.props;
        let newState, newValue;

        if (multiple) {
            newValue = value;

            // Add to selection if not yet selected
            if (!this.hasValue(addValue)) {
                newValue = value.concat([addValue]);
            } else if (value.length > 1) {
                // Unselect if many options are selected
                newValue.splice(
                    newValue.indexOf(addValue),
                    1
                );
            }

            newState = {
                value: newValue
            };
        } else {
            newValue = addValue;

            newState = {
                value:  addValue,
                opened: false
            };
        }

        this.setState(
            newState,
            () => {
                if (onChange) {
                    onChange(newValue);
                }
            }
        );
    },

    /**
     * Get current value as a string (for hidden input)
     * @return {String}
     */
    getStringValue() {
        const { renderToString } = this.props;
        const { value } = this.state;

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
    hasValue(value) {
        const currentValue = this.state.value;

        if (!this.props.multiple) {
            return (currentValue === value);
        } else {
            return (currentValue.indexOf(value) >= 0);
        }
    },

    /**
     * Focus the search input
     */
    focusSearch() {
        const { searchInput } = this.refs;
        if (!searchInput) {
            return;
        }

        searchInput.focus();
    },

    /**
     * Render button to open select
     */
    renderButton() {
        let { disabled, block, multiple, placeholder } = this.props;
        let { value, opened } = this.state;
        let ComponentSelection = this.props.componentSelection || this.props.component;

        let inner;

        if (value) {
            const values = multiple ? value : [value];
            inner = (
                <span className="SelectSelections">
                {values.map((val, i) => (
                    <span key={i} className="SelectSelection">
                        <ComponentSelection option={val} index={i} />
                    </span>
                ))}
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
     * Render the groups
     */
    renderGroups() {
        const { opened, groups, query } = this.state;
        const {
            search,
            filter,
            searchEmptyComponent: SearchEmptyComponent,
            ...props
         } = this.props;

        const className = classNames('SelectContainer', {
            'open': opened
        });

        // Filter empty groups based on search query
        const filteredGroups = groups.map((group) => ({
            ...group,
            options: group.options.filter((item, i) => filter(query, item, i))
        }))
        .filter((group) => group.options.length > 0);

        return (
            <div className={className}>
            {search ?
                <div className="SelectSearch">
                    <Input ref="searchInput"
                        value={query}
                        onChange={this.onSearchChanged}
                        placeholder={this.props.placeholder}
                    />
                </div>
                : null
            }

            {Boolean(filteredGroups.length) ?
                <div className="SelectGroups">
                {filteredGroups.map((group, i) => (
                    <SelectOptGroup {...props} key={i} group={group} hasValue={this.hasValue} onToggleOption={this.onToggleOption} />
                ))}
                </div>
                : null
            }

            {search && !filteredGroups.length ?
                <div className="SearchEmpty">
                    <SearchEmptyComponent query={query} />
                </div>
                : null
            }
            </div>
        );
    },

    render() {
        let { name, block } = this.props;
        const { opened } = this.state;

        let className = classNames('SelectFormControl', {
            block
        });

        return (
            <div className={className} onClick={(e) => e.stopPropagation()}>
                <input type="hidden" name={name} value={this.getStringValue()} />
                {this.renderButton()}
            {opened ?
                <Backdrop onClose={this.close}>
                    {this.renderGroups()}
                </Backdrop>
                : null
            }
            </div>
        );
    }
});

module.exports = Select;
