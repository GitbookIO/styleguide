const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Link = require('../src/Link');

const SCOPE = { React, Link };

const EXAMPLE_DEFAULT = `
<ul>
    <li>
        <Link href="https://www.gitbook.com" target="_blank">Normal link</Link>
    </li>
    <li>
        <Link muted={true}>Muted link</Link>
    </li>

    <li>
        <Link underlined={true}>Underlined link</Link>
    </li>

    <li>
        <Link onClick={() => window.alert('onClick')}>onClick link</Link>
    </li>
</ul>
`;

export default () => {
    return (
        <Page title="Links" active="links">
            <Panel>
                <Panel.Heading title="Links" />
                <Panel.Body>
                    <p>Some links</p>
                    <CodeEditor source="const Link = require('gitbook-styleguide/lib/Link');" />
                </Panel.Body>
            </Panel>

            <Example title="Default" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
        </Page>
    );
};
