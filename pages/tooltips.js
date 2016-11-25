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

const EXAMPLE_POSITIONS =
`<Tooltip title="Bottom right" open position={Tooltip.POSITIONS.BOTTOM_RIGHT}>
    <code>Bottom right</code>
</Tooltip>
<Tooltip title="Top right" open position={Tooltip.POSITIONS.TOP_RIGHT}>
    <code>Top right</code>
</Tooltip>
<Tooltip title="Bottom" open position={Tooltip.POSITIONS.BOTTOM}>
    <code>Bottom</code>
</Tooltip>
<Tooltip title="Bottom left" open position={Tooltip.POSITIONS.BOTTOM_LEFT}>
    <code>Bottom left</code>
</Tooltip>
<Tooltip title="Top" open position={Tooltip.POSITIONS.TOP}>
    <code>Top</code>
</Tooltip>`;

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
            <Example title="Positions" source={EXAMPLE_POSITIONS} scope={SCOPE}></Example>
        </Page>
    );
};
