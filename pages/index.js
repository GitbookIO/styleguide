import React from 'react';
const Page = require('./components/Page');
const Panel = require('../src/Panel');
const CodeEditor = require('./components/CodeEditor');

export default () => {
    return (
        <Page title="About" active="introduction">
            <Panel>
                <Panel.Heading title="About this styleguide" />
                <Panel.Body>
                    <p>
                        GitBook Styleguide is a collection of styling, React components and rules;{' '}
                        which are being used by the GitBook team on our applications such as gitbook.com.
                    </p>
                    <p>
                        This styleguide is open to criticsms and feedback, feel free to <a href="https://github.com/GitbookIO/styleguide">post an issue on GitHub</a>.
                    </p>
                </Panel.Body>
            </Panel>

            <Panel>
                <Panel.Heading title="Installation" />
                <Panel.Body>
                    <p>
                        GitBook styleguide can be installed using <b>NPM</b>,{' '}
                        the module is published as <code>gitbook-styleguide</code>.
                    </p>
                    <CodeEditor source="$ npm install gitbook-styleguide --save-dev" />
                </Panel.Body>
            </Panel>

            <Panel>
                <Panel.Heading title="Open Source" />
                <Panel.Body>
                    <p>
                        Available for use under the <b>Apache 2.0</b> license and built with open source projects like React, LESS and more.
                    </p>
                </Panel.Body>
            </Panel>
        </Page>
    );
};
