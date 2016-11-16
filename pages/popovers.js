const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Popover = require('../src/Popover');

const SCOPE = { React, Panel, Popover };

const EXAMPLE_IMPORT =
'const Popover = require(\'gitbook-styleguide/lib/Popover\');';

const EXAMPLE_DEFAULT =
`<Popover>
    <Popover.Heading title="Hello" />
    <Popover.Body>
        Inner body of the popover.
    </Popover.Body>
    <Popover.Controls>
        <Popover.Control active onClick={event => alert('Hello')}>
            Say Hello
        </Popover.Control>
        <Popover.Control onClick={event => alert('World')}>
            Say World
        </Popover.Control>
    </Popover.Controls>
</Popover>`;

export default () => {
    return (
        <Page title="Popovers" active="popovers">
            <Panel>
                <Panel.Heading title="Popovers" />
                <Panel.Body>
                    <p>
                        Add small overlay content, like those found in iOS, to any element for housing secondary information.
                    </p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Example" source={EXAMPLE_DEFAULT} scope={SCOPE} />
        </Page>
    );
};
