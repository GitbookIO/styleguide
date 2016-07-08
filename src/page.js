var React = require('react');

var HTMLPage = React.createClass({
    getDefaultProps: function() {
        return {
            lang: 'en'
        };
    },

    render: function() {
        return (
            <html lang={this.props.lang}>
                {this.props.children}
            </html>
        );
    }
});

var HTMLHead = React.createClass({
    getDefaultProps: function() {
        return {
            charSet: 'utf-8'
        };
    },

    render: function() {
        return (
            <head>
                <meta charSet={this.props.charSet} />
                {this.props.children}
            </head>
        );
    }
});

var HTMLBody = React.createClass({
    render: function() {
        return (
            <body>{this.props.children}</body>
        );
    }
});

module.exports      = HTMLPage;
module.exports.Head = HTMLHead;
module.exports.Body = HTMLBody;
