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
        onChange:     React.PropTypes.func.isRequired,
        // Called when onEnter on the input (no result selected)
        // query -> ()
        onEnter:      React.PropTypes.func.isRequired,
        onPaste:      React.PropTypes.func,
        value:        React.PropTypes.string,
        placeholder:  React.PropTypes.string,
        size:         React.PropTypes.string
    },

    getInitialState() {
        return {
            value:   this.props.value || '',
            cursor:  null,
            loading: false,
            focused: false,
            results: []
        };
    },

    /**
     * Typed value changed, we fetch the new autocomplete result
     */
    onInputChanged(e) {
        const that = this;
        const onFetch = this.props.onFetch;
        const value  = e.target.value;

        this.setState({
            value,
            loading: true
        });

        onFetch(value, function(results) {
            that.setState({
                loading: false,
                results
            });
        });
    },

    /**
     * User is focusing/blur the input
     */
    onFocusChanged(isFocused) {
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
        const { onChange } = this.props;
        const { value, results } = this.state;
        const selected = results[index];

        this.setState({
            cursor: null,
            results: [],
            value: ''
        });

        onChange(value, selected);
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
        const that = this;
        const { results, value, cursor } = this.state;
        const ResultComponent = this.props.renderResult;

        return (
            <div className="AutocompleteResults">
                {results.map(function(result, i) {
                    const isActive = (i === cursor);

                    return <AutocompleteResult key={value + '-' + i} active={isActive}
                                                onClick={e => that.onSelect(i)}>
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
