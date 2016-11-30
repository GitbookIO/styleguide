const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Blankslate = require('../src/Blankslate');

const SCOPE = { React, Blankslate };

const EXAMPLE_DEFAULT = `<Blankslate icon="book">
    <h3>No books</h3>
    <p>Create a book to get started</p>
</Blankslate>`;

export default () => {
    return (
        <Page title="Blankslates" active="blankslates">
            <Panel>
                <Panel.Heading title="Blankslate" />
                <Panel.Body>
                    <p>Blankslates are for when there is a lack of content within a page or section.{' '}
                    Use them as placeholders to tell users why something isn’t there. Be sure to provide an action to add content as well.</p>
                    <CodeEditor source="const Blankslate = require('gitbook-styleguide/lib/Blankslate');" />
                </Panel.Body>
            </Panel>

            <Example title="Default" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
        </Page>
    );
};
