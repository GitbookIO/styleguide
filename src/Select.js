const React      = require('react');
const classNames = require('classnames');

const SIZES    = require('./SIZES');
const Button   = require('./Button');
const Input    = require('./Input');
const Backdrop = require('./Backdrop');

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
 * <Select name="test" options=[] />
 */
const Select = React.createClass({
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

    getDefaultProps() {
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

    getInitialState() {
        return {
            value:    this.props.value,
            query:    '',
            opened:   false,
            groups:   this.propsToGroups(this.props)
        };
    },

    componentWillReceiveProps(newProps) {
        this.setState({
            value:  newProps.value,
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
                    1);
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

        this.setState(newState, function() {
            if (onChange) {
                onChange(newValue);
            }
        });
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
            inner      = (
                <span className="SelectSelections">
                {values.map(function(val, i) {
                    return (
                        <span key={i} className="SelectSelection">
                            <ComponentSelection option={val} index={i} />
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
    renderSearch() {
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
    renderGroup(group, index) {
        const { query } = this.state;
        const { filter } = this.props;
        let Component = this.props.component;
        let count     = 0;

        const options = group.options.map(function(item, i) {
            if (!filter(query, item, i)) {
                return '';
            }

            count++;

            return (
                <div
                    key={i}
                    className={classNames('SelectOption', { active: this.hasValue(item) })}
                    onClick={e => this.onToggleOption(item)}
                >
                    <Component option={item} index={i} />
                </div>
            );
        }, this);

        // Don't display empty groups (when filtered)
        if (count === 0) {
            return '';
        }

        return (
            <div key={index} className="SelectOptGroup">
                {group.label ? <div className="GroupLabel">{group.label}</div> : ''}
                <div className="GroupOptions">
                    {options}
                </div>
            </div>
        );
    },

    /**
     * Render the groups
     */
    renderGroups() {
        const { opened, groups } = this.state;
        const { search } = this.props;

        const className = classNames('SelectContainer', {
            'open': opened
        });

        return (
            <div className={className}>
                {search ? this.renderSearch() : ''}
                <div className="SelectGroups">
                    {groups.map(this.renderGroup)}
                </div>
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
            <div className={className} onClick={e => e.stopPropagation()}>
                <input type="hidden" name={name} value={this.getStringValue()} />
                {this.renderButton()}
                {opened ? <Backdrop onClose={this.close}>{this.renderGroups()}</Backdrop> : ''}
            </div>
        );
    }
});

module.exports = Select;
