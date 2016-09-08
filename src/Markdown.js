const React = require('react');
const classNames = require('classnames');

/**
 * Markdown content rendered with clean style.
 *
 * A "convert" prop can be given to convert the markdown to HTML.
 */
const Markdown = React.createClass({
    propTypes: {
        source:    React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        convert:   React.PropTypes.func
    },

    render() {
        let { source, convert, className } = this.props;
        const html = convert ? convert(source) : source;
        className = classNames('gb-markdown', className);

        return <div className={className} dangerouslySetInnerHTML={{__html: html}} />;
    }
});

module.exports = Markdown;
