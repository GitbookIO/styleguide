const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Table = require('../src/Table');
const ListGroup = require('../src/ListGroup');

const SCOPE = { React, Panel, Table, ListGroup };

const EXAMPLE_IMPORT =
'const Panel = require(\'gitbook-styleguide/lib/Panel\');';

const EXAMPLE_DEFAULT =
`<Panel>
    <Panel.Heading title="Title" />
    <Panel.Body>
        Body of the panel
    </Panel.Body>
</Panel>`;

const EXAMPLE_LISTGROUP =
`<Panel>
    <Panel.Heading title="Title" />
    <ListGroup>
        <ListGroup.Item active={true}>Account</ListGroup.Item>
        <ListGroup.Item>Profile</ListGroup.Item>
        <ListGroup.Item>Notifications</ListGroup.Item>
    </ListGroup>
</Panel>`;

const EXAMPLE_TABLE =
`<Panel>
    <Panel.Heading title="Title" />
    <Table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Updated</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>PHP</td>
                <td>1 month ago</td>
            </tr>
            <tr>
                <td>JS</td>
                <td>1 month ago</td>
            </tr>
        </tbody>
    </Table>
</Panel>`;

export default () => {
    return (
        <Page title="Panels" active="panels">
            <Panel>
                <Panel.Heading title="Panel" />
                <Panel.Body>
                    <p>

                    </p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Example" source={EXAMPLE_DEFAULT} scope={SCOPE}>

            </Example>

            <Example title="With a table" source={EXAMPLE_TABLE} scope={SCOPE}>

            </Example>

            <Example title="With a list group" source={EXAMPLE_LISTGROUP} scope={SCOPE}>

            </Example>
        </Page>
    );
};
