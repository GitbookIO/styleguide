var React = require('react');
var classNames = require('classnames');

var Icon = require('./Icon');
var Form = require('./Form');
var Input = require('./Input');

var SearchBar = React.createClass({
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

    getDefaultProps: function() {
        return {
            method: 'get'
        };
    },

    getInitialState: function() {
        return {
            value: this.props.value
        };
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

    onSubmit: function(e) {
        if (this.props.onSubmit) {
            e.preventDefault();
            this.props.onSubmit(this.state.value);
        }
    },

    render: function() {
        var {action, placeholder,
            name, method} = this.props;
        var value = this.state.value;

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
