const React = require('react');
const Menu = require('./Menu');
const Logo = require('../icons/Logo');


/**
 * Logo of GitBook in the footer
 * @type {ReactClass}
 */
const FooterLogo = React.createClass({
    render() {
        return (
            <div className="footer-logo">
                <Logo />
            </div>
        );
    }
});


/**
 * Copyright in the footer
 * @type {ReactClass}
 */
const FooterCopyright = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <Menu.Item href="https://www.gitbook.com" className="footer-copyright">
                © GitBook.com
            </Menu.Item>
        );
    }
});

/**
 * Container for the footer.
 * @type {ReactClass}
 */
const PageFooter = React.createClass({
    statics: {
        Copyright: FooterCopyright,
        Logo:      FooterLogo
    },

    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="gb-page-footer">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageFooter;
