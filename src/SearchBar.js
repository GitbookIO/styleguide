const React = require('react');
const classNames = require('classnames');

const Icon = require('./Icon');
const Form = require('./Form');
const Input = require('./Input');

const SearchBar = React.createClass({
    propTypes: {
        className:   React.PropTypes.string,
        placeholder: React.PropTypes.string,
        value:       React.PropTypes.string,
        action:      React.PropTypes.string,
        name:        React.PropTypes.string,
        method:      React.PropTypes.string,
        onSubmit:    React.PropTypes.func,
        onChange:    React.PropTypes.func
    },

    getDefaultProps() {
        return {
            method: 'get'
        };
    },

    getInitialState() {
        return {
            value: this.props.value
        };
    },

    onChange(e) {
        const { value } = e.target;

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    },

    onSubmit(e) {
        if (this.props.onSubmit) {
            e.preventDefault();
            this.props.onSubmit(this.state.value);
        }
    },

    render() {
        const { action, placeholder,
            name, method } = this.props;
        const { value } = this.state;

        return (
            <Form className={classNames('search-bar', this.props.className)}
                  method={method}
                  action={action}>
                <Icon id="search" />
                <Input name={name}
                       value={value}
                       onChange={this.onChange}
                       placeholder={placeholder} />
            </Form>
        );
    }
});

module.exports = SearchBar;
