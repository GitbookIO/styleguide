import React from 'react';
import Head from 'next/head';
const { StickyContainer, Sticky } = require('react-sticky');
const PageWrapper = require('../../src/PageWrapper');
const PageInner = require('../../src/PageInner');
const PageBody = require('../../src/PageBody');
const PageHeader = require('../../src/PageHeader');
const PageFooter = require('../../src/PageFooter');
const Container = require('../../src/Container');
const Panel = require('../../src/Panel');
const Row = require('../../src/Row');
const Button = require('../../src/Button');
const Icon = require('../../src/Icon');
const ListGroup = require('../../src/ListGroup');
const LogoText = require('../../icons/LogoText');

const Menu = ({active}) => (
    <ListGroup>
        <ListGroup.Item active={active == 'introduction'} href="/">Introduction</ListGroup.Item>
        <ListGroup.Item active={active == 'icons'} href="/icons">Logos and Icons</ListGroup.Item>
        <ListGroup.Item active={active == 'buttons'} href="/buttons">Buttons</ListGroup.Item>
        <ListGroup.Item active={active == 'forms'} href="/forms">Forms</ListGroup.Item>
        <ListGroup.Item active={active == 'navigation'} href="/navigation">Navigation</ListGroup.Item>
        <ListGroup.Item active={active == 'alerts'} href="/alerts">Alerts</ListGroup.Item>
        <ListGroup.Item active={active == 'blankslates'} href="/blankslates">Blankslates</ListGroup.Item>
        <ListGroup.Item active={active == 'modals'} href="/modals">Modals</ListGroup.Item>
        <ListGroup.Item active={active == 'tooltips'} href="/tooltips">Tooltips</ListGroup.Item>
        <ListGroup.Item active={active == 'panels'} href="/panels">Panels</ListGroup.Item>
        <ListGroup.Item active={active == 'popovers'} href="/popovers">Popovers</ListGroup.Item>
    </ListGroup>
);
Menu.propTypes = {
    active: React.PropTypes.bool
};

const Page = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        active: React.PropTypes.string,
        children: React.PropTypes.node
    },

    render() {
        const { title, children, active } = this.props;

        return (
            <PageWrapper>
                <Head>
                    <title>{title}</title>
                    <link rel="stylesheet" href="/static/css/gitbook.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/themes/prism.css" />
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>

                <PageHeader>
                    <Container>
                        <a href="/"><LogoText size="md" /></a>
                        <Button href="https://github.com/GitbookIO/styleguide" className="pull-right hidden-xs">
                            <Icon id="octoface" size="sm" /> GitHub
                        </Button>
                    </Container>
                </PageHeader>
                <PageBody>
                    <PageInner>
                        <StickyContainer>
                            <Container>
                                <Row>
                                    <Row.Col md={3}>
                                        <Sticky stickyStyle={{ marginTop: 20 }}>
                                            <Panel>
                                                <Menu active={active} />
                                            </Panel>
                                        </Sticky>
                                    </Row.Col>
                                    <Row.Col md={9}>
                                        {children}
                                    </Row.Col>
                                </Row>
                            </Container>
                        </StickyContainer>
                    </PageInner>
                </PageBody>
                <PageFooter>

                </PageFooter>
            </PageWrapper>
        );
    }
});

module.exports = Page;
