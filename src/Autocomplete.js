const React = require('react');
const classNames = require('classnames');

const Input = require('./Input');
const Spinner = require('./Spinner');

const KEYCODE_ENTER = 13;
const KEYCODE_UP    = 38;
const KEYCODE_DOWN  = 40;

const Autocomplete = React.createClass({
    propTypes: {
        onFetch:      React.PropTypes.func.isRequired,
        renderResult: React.PropTypes.func.isRequired,
        // Called when onEnter on the input (no result selected)
        onEnter:      React.PropTypes.func.isRequired,
        onPaste:      React.PropTypes.func,
        // Focus events
        onFocus:      React.PropTypes.func,
        onBlur:       React.PropTypes.func,
        // Control the event
        value:        React.PropTypes.string,
        // Called when typing - Required when value is passed
        onChange:     React.PropTypes.func,
        // Called when selecting an entry
        onSelect:     React.PropTypes.func.isRequired,
        // Render options
        placeholder:  React.PropTypes.string,
        size:         React.PropTypes.string
    },

    getInitialState() {
        const { value, onChange } = this.props;

        if ((typeof value == 'string') && !onChange) {
            throw new Error('onChange should be passed to Autocomplete when value is passed');
        }

        return {
            value:   value || '',
            cursor:  null,
            loading: false,
            focused: false,
            results: []
        };
    },

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value || '';
        this.updateValue(value);
    },

    /**
     * Update the value.
     */
    updateValue(value) {
        const { value: prevValue } = this.state;
        const { onFetch } = this.props;

        if (prevValue == value) {
            return;
        }

        this.setState({
            value,
            loading: true
        });

        onFetch(value, (results) => {
            this.setState({
                loading: false,
                results
            });
        });
    },

    /**
     * Typed value changed, we fetch the new autocomplete result
     */
    onInputChanged(e) {
        const { onChange } = this.props;
        const { value } = e.target;

        this.updateValue(value);

        if (onChange) {
            onChange(value);
        }
    },

    /**
     * User is focusing/blur the input
     */
    onFocusChanged(isFocused) {
        const { onFocus, onBlur } = this.props;

        if (isFocused && onFocus) {
            onFocus();
        } else if (onBlur) {
            onBlur();
        }

        this.setState({
            focused: isFocused
        });
    },

    /**
     * Submit value at cursor
     */
    onEnter() {
        const { cursor, value } = this.state;
        const { onEnter } = this.props;

        if (cursor >= 0) {
            this.onSelect(cursor);
        } else if (onEnter) {
            onEnter(value);
            this.setState({
                focused: false,
                cursor: null,
                results: [],
                value: ''
            });
        }
    },

    /**
     * Submit a value
     */
    onSelect(index) {
        const { onSelect } = this.props;
        const { value, results } = this.state;
        const selected = results[index];

        this.setState({
            cursor: null,
            results: [],
            value: ''
        });

        onSelect(value, selected);
    },

    /**
     * User pressed a key in text input
     */
    onKeyDown(e) {
        let { cursor, results } = this.state;

        if (e.keyCode === KEYCODE_ENTER) {
            e.preventDefault();
            this.onEnter();
        }
        else if (e.keyCode === KEYCODE_DOWN) {
            e.preventDefault();
            cursor++;
        }
        else if (e.keyCode === KEYCODE_UP) {
            e.preventDefault();
            cursor--;
        }

        if (cursor >= results.length) {
            cursor = (results.length - 1);
        }
        if (cursor < -1) {
            cursor = -1;
        }

        this.setState({
            cursor
        });
    },

    /**
     * Render the suggestions
     */
    renderResults() {
        const { results, value, cursor } = this.state;
        const ResultComponent = this.props.renderResult;

        return (
            <div className="AutocompleteResults">
                {results.map((result, i) => {
                    const isActive = (i === cursor);

                    return <AutocompleteResult key={value + '-' + i} active={isActive}
                                                onClick={e => this.onSelect(i)}>
                        <ResultComponent result={result} index={i} active={isActive} />
                    </AutocompleteResult>;
                })}
            </div>
        );
    },

    /**
     * Focus or blur the autocomplete
     */
    focus() {
        const { input } = this.refs;
        input.focus();
    },
    blur() {
        const { input } = this.refs;
        input.blur();
    },

    render() {
        const { onPaste, size, placeholder } = this.props;
        const { value, focused, loading, results } = this.state;

        return (
            <div className="Autocomplete">
                <Input
                    ref="input"
                    value={value}
                    placeholder={placeholder}
                    size={size}
                    onChange={this.onInputChanged}
                    onFocus={e => this.onFocusChanged(true)}
                    onBlur={e => this.onFocusChanged(false)}
                    onPaste={onPaste}
                    onKeyDown={this.onKeyDown}
                />
                {loading ? <Spinner size="sm" centered={false} /> : ''}
                {focused && results.length > 0 ? this.renderResults() : ''}
            </div>
        );
    }
});

/**
 * Container for the results.
 * @type {ReactClass}
 */
const AutocompleteResult = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        children: React.PropTypes.node
    },

    render() {
        const { active, children, onClick } = this.props;
        return (
            <div className={classNames('AutocompleteResult', { active })}
                 onMouseDown={onClick}>
                {children}
            </div>
        );
    }
});

module.exports = Autocomplete;
