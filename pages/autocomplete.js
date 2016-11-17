const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Autocomplete = require('../src/Autocomplete');

const SCOPE = { React, Autocomplete };

const EXAMPLE_IMPORT =
'const Autocomplete = require(\'gitbook-styleguide/lib/Autocomplete\');';

const EXAMPLE_DEFAULT =
`<Autocomplete
    placeholder="Enter a language"
    onFetch={(query, callback) => {
        callback([
            { id: 'en', label: 'English' },
            { id: 'fr', label: 'French' }
        ])
    }}
    onChange={(query, result) => alert('Selected is ' + result.label)}
    renderResult={({result}) => <span><b>{result.id}</b> {result.label}</span>}
/>`;

export default () => {
    return (
        <Page title="Autocomplete" active="autocomplete">
            <Panel>
                <Panel.Heading title="Autocomplete" />
                <Panel.Body>
                    <p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Example" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
        </Page>
    );
};
