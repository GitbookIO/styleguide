const React = require('react');
const classNames = require('classnames');

const Input = require('./Input');
const Spinner = require('./Spinner');

const KEYCODE_ENTER = 13;
const KEYCODE_UP    = 38;
const KEYCODE_DOWN  = 40;

const Autocomplete = React.createClass({
    propTypes: {
        onFetch:      React.PropTypes.func,
        renderResult: React.PropTypes.func,
        // Called when onEnter on the input (no result selected)
        // query -> ()
        onEnter:      React.PropTypes.func,
        value:        React.PropTypes.string,
        placeholder:  React.PropTypes.string,
        size:         React.PropTypes.string,
        onChange:     React.PropTypes.func
    },

    getInitialState: function() {
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
    onInputChanged: function(e) {
        const that = this;
        const onFetch = this.props.onFetch;
        const value  = e.target.value;

        this.setState({
            value: value,
            loading: true
        });

        onFetch(value, function(results) {
            that.setState({
                loading: false,
                results: results
            });
        });
    },

    /**
     * User is focusing/blur the input
     */
    onFocusChanged: function(isFocused) {
        this.setState({
            focused: isFocused
        });
    },

    /**
     * Submit value at cursor
     */
    onEnter: function() {
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
        this.onSelect(this.state.cursor);
    },

    /**
     * Submit a value
     */
    onSelect: function (index) {
        const { value, results } = this.state;
        const selected = results[index];

        this.setState({
            cursor: null,
            results: [],
            value: ''
        });

        this.props.onChange(value, selected);
    },

    /**
     * User pressed a key in text input
     */
    onKeyDown: function(e) {
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
            cursor: cursor
        });
    },

    /**
     * Render the suggestions
     */
    renderResults: function() {
        const that = this;
        const { results, value, cursor } = this.state;
        const ResultComponent = this.props.renderResult;

        return (
            <div className="AutocompleteResults">
                {results.map(function(result, i) {
                    const isActive = (i === cursor);

                    return <AutocompleteResult key={value+'-'+i} active={isActive}
                                                onClick={e => that.onSelect(i)}>
                        <ResultComponent result={result} index={i} active={isActive} />
                    </AutocompleteResult>;
                })}
            </div>
        );
    },

    render: function() {
        const { value, focused, loading, results } = this.state;

        return (
            <div className="Autocomplete">
                <Input
                    value={value}
                    placeholder={this.props.placeholder}
                    size={this.props.size}
                    onChange={this.onInputChanged}
                    onFocus={e => this.onFocusChanged(true)}
                    onBlur={e => this.onFocusChanged(false)}
                    onKeyDown={this.onKeyDown}
                />
                {loading? <Spinner size="sm" centered={false} /> : ''}
                {focused && results.length > 0? this.renderResults() : ''}
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

    render: function() {
        const { active, children, onClick } = this.props;
        return (
            <div className={classNames('AutocompleteResult', { active: active })}
                 onMouseDown={onClick}>
                {children}
            </div>
        );
    }
});

module.exports = Autocomplete;
