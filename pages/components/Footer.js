const React = require('react');
const PageFooter = require('../../src/PageFooter');
const Container = require('../../src/Container');
const Menu = require('../../src/Menu');

const Footer = React.createClass({
    render() {
        return (
            <PageFooter>
                <Container>
                    <PageFooter.Logo />
                    <Menu>
                        <Menu.Item href="https://www.gitbook.com">About</Menu.Item>
                        <Menu.Item href="https://github.com/GitbookIO/styleguide/issues">Post an issue</Menu.Item>
                        <PageFooter.Copyright />
                    </Menu>
                </Container>
            </PageFooter>
        );
    }
});

module.exports = Footer;
