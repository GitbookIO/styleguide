const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Card = require('../src/Card');
const Row = require('../src/Row');
const Button = require('../src/Button');
const Icon = require('../src/Icon');

const SCOPE = { React, Card, Row, Button, Icon };

const EXAMPLE_IMPORT = 'const Card = require(\'gitbook-styleguide/lib/Card\')';
const EXAMPLE_DEFAULT =
`<Row>
    <Row.Col md={6}>
        <Card>
            <Card.Heading title="Official Documentation" />
            <Card.Body>
                <p>
                    <Card.Flag><Icon id="zap" /></Card.Flag>
                    {' '}Learn about our awesome API.
                </p>
                <p>Created 2 months ago</p>
            </Card.Body>
            <Card.Actions>
                <Button>Read</Button>
                <Button>Edit</Button>
            </Card.Actions>
        </Card>
    </Row.Col>
</Row>`;

export default () => {
    return (
        <Page title="Cards" active="cards">
            <Panel>
                <Panel.Heading title="Cards" />
                <Panel.Body>
                    <p>Cards are container for informations in a list (like books, users, plugins). Each cards has a title, body and a set of actions.</p>
                    <p>Cards are design for quick access with optional secondary actions.</p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Default" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
        </Page>
    );
};
