const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Dropdown = require('../src/Dropdown');
const Button = require('../src/Button');
const ContextMenu = require('../src/ContextMenu');
const Icon = require('../src/Icon');

const SCOPE = { React, Dropdown, Button, Icon, ContextMenu };

const EXAMPLE_IMPORT = 'const Dropdown = require(\'gitbook-styleguide/lib/Dropdown\')';
const EXAMPLE_DEFAULT =
`<Dropdown>
    <Button>
        Toggle dropdown <Button.Caret />
    </Button>
    <Dropdown.Item header>Account</Dropdown.Item>
    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item onClick={e => alert('Logout')}>Logout</Dropdown.Item>
</Dropdown>`;

const EXAMPLE_CONTEXTMENU =
`<ContextMenu component={() => (
    <Dropdown.Menu>
        <Dropdown.Item onClick={e => alert('Logout')}>Logout</Dropdown.Item>
    </Dropdown.Menu>
)}>
    <div>Left click</div>
</ContextMenu>`;

export default () => {
    return (
        <Page title="Dropdowns" active="dropdowns">
            <Panel>
                <Panel.Heading title="Dropdowns" />
                <Panel.Body>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Default" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
            <Example title="Context Menu" source={EXAMPLE_CONTEXTMENU} scope={SCOPE}></Example>
        </Page>
    );
};
