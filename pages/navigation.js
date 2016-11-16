const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const FilterList = require('../src/FilterList');
const Octicon = require('../src/Octicon');
const ListGroup = require('../src/ListGroup');

const SCOPE = { React, FilterList, Panel, ListGroup, Octicon };

const EXAMPLE_MENU =
`<Panel>
    <ListGroup>
        <ListGroup.Item active={true}>
            <Octicon id="gear" size="sm" /> Account
        </ListGroup.Item>
        <ListGroup.Item>
            <Octicon id="person" size="sm" /> Profile
        </ListGroup.Item>
        <ListGroup.Item>
            <Octicon id="mail" size="sm" /> Notifications
        </ListGroup.Item>
    </ListGroup>
</Panel>`;

const EXAMPLE_FILTERLIST =
`<FilterList>
    <FilterList.Item selected={true} count={21}>First filter</FilterList.Item>
    <FilterList.Item count={3}>Second filter</FilterList.Item>
    <FilterList.Item>Third filter</FilterList.Item>
</FilterList>`;

export default () => {
    return (
        <Page title="Navigation" active="navigation">
            <Panel>
                <Panel.Heading title="Alerts" />
                <Panel.Body>
                    <p>This styleguide comes with several navigation components. Some were designed with singular purposes, while others were design to be more flexible and appear quite frequently.</p>
                    <CodeEditor source="const FilterList = require('gitbook-styleguide/lib/FilterList');" />
                </Panel.Body>
            </Panel>

            <Example title="Menu" source={EXAMPLE_MENU} scope={SCOPE}>
                The menu is a vertical list of navigational links. It should be put in a panel.
            </Example>

            <Example title="Filter list" source={EXAMPLE_FILTERLIST} scope={SCOPE}>
                A vertical list of filters. Grey text on white background. Selecting a filter from the list will fill its background with blue and make the text white.
            </Example>
        </Page>
    );
};
