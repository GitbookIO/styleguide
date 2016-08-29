var React = require('react');

var PageHeader = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="gb-page-header">
                {this.props.children}
            </div>
        );
    }
});

var Logo = React.createClass({
    propTypes: {
        href: React.PropTypes.string,
        src:  React.PropTypes.string,
        children: React.PropTypes.node
    },

    render() {
        var src  = this.props.src;
        var href = this.props.href;

        return (
            <a href={href} className="logo pull-left">
                <img src={src} />
                <h1>{this.props.children}</h1>
            </a>
        );
    }
});

module.exports = PageHeader;
module.exports.Logo = Logo;
