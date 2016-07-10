var React = require('react');

/**
 * Convert markdown to HTML
 *
 * @param {String} source
 * @return {String} html
 */
function markdownToHTML(source) {
    return source;
}


var Markdown = React.createClass({
    propTypes: {
        source: React.PropTypes.string.isRequired
    },

    render: function() {
        var source = this.props.source;
        var html   = markdownToHTML(source);

        return <div className="gb-markdown" dangerouslySetInnerHTML={{__html: html}} />;
    }
});

module.exports = Markdown;
