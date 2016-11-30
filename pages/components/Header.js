const React = require('react');
const PageHeader = require('../../src/PageHeader');
const Container = require('../../src/Container');
const Button = require('../../src/Button');
const Icon = require('../../src/Icon');

const Header = React.createClass({
    render() {
        return (
            <PageHeader>
                <Container>
                    <PageHeader.Logo href="/" />
                    <Button style="link" href="https://www.gitbook.com">About</Button>
                    <Button style="link" href="https://www.gitbook.com/blog">Blog</Button>
                    <Button href="https://github.com/GitbookIO/styleguide" className="pull-right hidden-xs">
                        <Icon id="octoface" size="sm" /> GitHub
                    </Button>
                </Container>
            </PageHeader>
        );
    }
});

module.exports = Header;
