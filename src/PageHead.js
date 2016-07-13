var React = require('react');

var Icon = require('./Icon');
var Form = require('./Form');
var Input = require('./Input');

var PageHead = React.createClass({
    render: function() {
        return (
            <div className="pagehead">
                {this.props.children}
            </div>
        );
    }
});

var HeadTitle = React.createClass({
    render: function() {
        return (
            <h1>
                {this.props.children}
            </h1>
        );
    }
});

var HeadSearchBar = React.createClass({
    propTypes: {
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

    onChange: function(newValue) {
        this.setState({
            value: newValue
        });

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    },

    onSubmit: function(e) {
        if (!this.props.onSubmit) {
            return;
        }

        e.preventDefault();
        this.props.onSubmit(this.state.value);
    },

    render: function() {
        var {action, placeholder,
            name, method} = this.props;
        var value = this.state.value;

        return (
            <Form className="search-bar hidden-xs hidden-sm pull-right" method={method} action={action}>
                <Icon id="search" />
                <Input name={name} value={value} onChange={this.onChange} placeholder={placeholder} />
            </Form>
        );
    }
});

module.exports           = PageHead;
module.exports.Title     = HeadTitle;
module.exports.SearchBar = HeadSearchBar;
