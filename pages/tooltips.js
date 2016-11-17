const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Tooltip = require('../src/Tooltip');
const Button = require('../src/Button');

const SCOPE = { React, Tooltip, Button };

const EXAMPLE_IMPORT =
'const Tooltip = require(\'gitbook-styleguide/lib/Tooltip\');';

const EXAMPLE_DEFAULT =
`<Tooltip title="Hello World">
     There is a tooltip
</Tooltip>
<Tooltip title="Hello World">
     , hover this text.
</Tooltip>
<Tooltip title="Hello World" open>
     This one is open
</Tooltip>`;

const EXAMPLE_BUTTONS =
`<Button.Toolbar>
    <Button title="Hello 1">Do something</Button>
    <Button title="Hello 2">Else</Button>
</Button.Toolbar>`;

export default () => {
    return (
        <Page title="Tooltips" active="tooltips">
            <Panel>
                <Panel.Heading title="Tooltips" />
                <Panel.Body>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Example" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
            <Example title="Buttons" source={EXAMPLE_BUTTONS} scope={SCOPE}></Example>
        </Page>
    );
};
