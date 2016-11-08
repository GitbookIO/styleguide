const React = require('react');
const Head = require('next/head').default;
const PageWrapper = require('../../src/PageWrapper');
const PageInner = require('../../src/PageInner');
const PageBody = require('../../src/PageBody');
const PageHeader = require('../../src/PageHeader');
const PageFooter = require('../../src/PageFooter');
const Container = require('../../src/Container');
const Panel = require('../../src/Panel');
const Row = require('../../src/Row');
const ListGroup = require('../../src/ListGroup');
const LogoText = require('../../icons/LogoText');

const Menu = ({active}) => (
    <ListGroup>
        <ListGroup.Item active={active == 'introduction'} href="/">Introduction</ListGroup.Item>
        <ListGroup.Item active={active == 'buttons'} href="/buttons">Buttons</ListGroup.Item>
        <ListGroup.Item active={active == 'forms'} href="/forms">Forms</ListGroup.Item>
        <ListGroup.Item active={active == 'alerts'} href="/alerts">Alerts</ListGroup.Item>
        <ListGroup.Item active={active == 'blankslates'} href="/blankslates">Blankslates</ListGroup.Item>
        <ListGroup.Item active={active == 'modals'} href="/modals">Modals</ListGroup.Item>
        <ListGroup.Item active={active == 'tooltips'} href="/tooltips">Tooltips</ListGroup.Item>
        <ListGroup.Item active={active == 'panels'} href="/panels">Panels</ListGroup.Item>
        <ListGroup.Item active={active == 'popover'} href="/popover">Popover</ListGroup.Item>
    </ListGroup>
);


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
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.js"></script>
                    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/mode/javascript/javascript.min.js"></script>
                </Head>

                <PageHeader>
                    <Container>
                        <a href="/"><LogoText /></a>
                    </Container>
                </PageHeader>
                <PageBody>
                    <PageInner>
                        <Container>
                            <Row>
                                <Row.Col md={3}>
                                    <Panel>
                                        <Menu active={active} />
                                    </Panel>
                                </Row.Col>
                                <Row.Col md={9}>
                                    {children}
                                </Row.Col>
                            </Row>
                        </Container>
                    </PageInner>
                </PageBody>
                <PageFooter>

                </PageFooter>
            </PageWrapper>
        );
    }
});

module.exports = Page;
