var React = require('react');

var Button = require('./Button');

var FileInput = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        name:     React.PropTypes.string,
        accept:   React.PropTypes.string,
        disabled: React.PropTypes.bool
    },

    /**
     * Click this button
     */
    click: function() {
        this.refs.input.click();
    },

    onChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    render: function() {
        return (
            <Button {...this.props} onClick={this.click}>
                <input type="file" ref="input" name={this.props.name} style={{display: 'none'}} accept={this.props.accept} />
                {this.props.children}
            </Button>
        );
    }
});

module.exports = FileInput;
