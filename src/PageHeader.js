const React = require('react');

const PageHeader = React.createClass({
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

const Logo = React.createClass({
    propTypes: {
        href: React.PropTypes.string,
        src:  React.PropTypes.string,
        children: React.PropTypes.node
    },

    render() {
        const { href, src }  = this.props;

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
