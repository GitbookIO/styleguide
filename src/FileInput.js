const React = require('react');
const Button = require('./Button');

const FileInput = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        onChange: React.PropTypes.func,
        name:     React.PropTypes.string,
        accept:   React.PropTypes.string,
        disabled: React.PropTypes.bool
    },

    /**
     * Click this button
     */
    click() {
        this.refs.input.click();
    },

    onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    },

    render() {
        return (
            <Button {...this.props} onClick={this.click}>
                <input type="file" ref="input" name={this.props.name} style={{display: 'none'}} accept={this.props.accept} />
                {this.props.children}
            </Button>
        );
    }
});

module.exports = FileInput;
