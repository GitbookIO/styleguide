const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Avatar = require('../src/Avatar');
const AvatarsStack = require('../src/AvatarsStack');

const SCOPE = { React, Avatar, AvatarsStack };

const EXAMPLE_IMPORT =
`const Avatar = require('gitbook-styleguide/lib/Avatar');
const AvatarsStack = require('gitbook-styleguide/lib/AvatarsStack');`;

const EXAMPLE_DEFAULT =
`<Avatar
    src="https://picturepan2.github.io/spectre/demo/img/avatar-1.png"
    size="lg"
    />
<Avatar
    src="https://picturepan2.github.io/spectre/demo/img/avatar-3.png"
    size="md"
    />
<Avatar
    src="https://picturepan2.github.io/spectre/demo/img/avatar-4.png"
    size="sm"
    />`;

const EXAMPLE_STACK =
`<AvatarsStack>
    <AvatarsStack.Item>
        <Avatar
            src="https://picturepan2.github.io/spectre/demo/img/avatar-1.png"
            size="sm"
            />
    </AvatarsStack.Item>
    <AvatarsStack.Item>
        <Avatar
            src="https://picturepan2.github.io/spectre/demo/img/avatar-3.png"
            size="sm"
            />
    </AvatarsStack.Item>
    <AvatarsStack.Item>
        <Avatar
            src="https://picturepan2.github.io/spectre/demo/img/avatar-4.png"
            size="sm"
            />
    </AvatarsStack.Item>
</AvatarsStack>`;


export default () => {
    return (
        <Page title="Avatars" active="avatars">
            <Panel>
                <Panel.Heading title="Avatars" />
                <Panel.Body>
                    <p>

                    </p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Layout" source={EXAMPLE_DEFAULT} scope={SCOPE} />

            <Example title="Stack" source={EXAMPLE_STACK} scope={SCOPE}>
                Stack of avatars can be used to display a list of participants.
            </Example>
        </Page>
    );
};
