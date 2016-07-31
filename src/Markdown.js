var React = require('react');

/**
 * Markdown content rendered with clean style.
 *
 * A "convert" prop can be given to convert the markdown to HTML.
 */
var Markdown = React.createClass({
    propTypes: {
        source:  React.PropTypes.string.isRequired,
        convert: React.PropTypes.func
    },

    render: function() {
        var source = this.props.source;
        var html   = this.props.convert? this.props.convert(source) : source;

        return <div className="gb-markdown" dangerouslySetInnerHTML={{__html: html}} />;
    }
});

module.exports = Markdown;
