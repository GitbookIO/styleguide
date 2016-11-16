const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Alert = require('../src/Alert');
const Icon = require('../src/Icon');

const SCOPE = { React, Alert };

const EXAMPLE_DEFAULT = '<Alert.Info>Flash message goes here.</Alert.Info>';
const EXAMPLE_DANGER =
`<Alert.Danger>
    <Icon id="alert" size="sm" /> This is an alert!
</Alert.Danger>`;

export default () => {
    return (
        <Page title="Alerts" active="alerts">
            <Panel>
                <Panel.Heading title="Alerts" />
                <Panel.Body>
                    <p>Flash messages, or alerts, inform users of successful or pending actions. Use them sparingly. Don’t show more than one at a time.</p>
                    <CodeEditor source="const Alert = require('gitbook-styleguide/lib/Alert');" />
                </Panel.Body>
            </Panel>

            <Example title="Default" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
            <Example title="Danger" source={EXAMPLE_DANGER} scope={SCOPE}></Example>
        </Page>
    );
};
