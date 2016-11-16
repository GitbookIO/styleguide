const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');

const SCOPE = { React, Panel };

const EXAMPLE_IMPORT =
'const Panel = require(\'gitbook-styleguide/lib/Panel\');';

const EXAMPLE_DEFAULT =
`<Panel>
    <Panel.Heading title="Title" />
    <Panel.Body>
        Body of the panel
    </Panel.Body>
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
        </Page>
    );
};
