const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const FilterList = require('../src/FilterList');
const Icon = require('../src/Icon');
const ListGroup = require('../src/ListGroup');
const Overview = require('../src/Overview');
const Pagination = require('../src/Pagination');
const PageHead = require('../src/PageHead');
const Menu = require('../src/Menu');
const SearchBar = require('../src/SearchBar');
const Row = require('../src/Row');
const Container = require('../src/Container');

const SCOPE = { React, FilterList, Panel, ListGroup, Icon, Overview,
    Pagination, PageHead, Menu, SearchBar, Row, Container };

const EXAMPLE_IMPORTS =
`const FilterList = require('gitbook-styleguide/lib/FilterList');
const Menu = require('gitbook-styleguide/lib/Menu');
const SearchBar = require('gitbook-styleguide/lib/SearchBar');
const PageHead = require('gitbook-styleguide/lib/PageHead');
const Pagination = require('gitbook-styleguide/lib/Pagination');
const ListGroup = require('gitbook-styleguide/lib/ListGroup');
const Overview = require('gitbook-styleguide/lib/Overview');`;

const EXAMPLE_MENU =
`<Panel>
    <ListGroup>
        <ListGroup.Item active={true}>
            <Icon id="gear" size="sm" /> Account
        </ListGroup.Item>
        <ListGroup.Item>
            <Icon id="person" size="sm" /> Profile
        </ListGroup.Item>
        <ListGroup.Item>
            <Icon id="mail" size="sm" /> Notifications
        </ListGroup.Item>
    </ListGroup>
</Panel>`;

const EXAMPLE_PAGEHEAD_MENU =
`<PageHead>
    <Container>
        <Row>
            <Row.Col md={5}>
                <PageHead.Title>
                    Contact GitBook
                </PageHead.Title>
            </Row.Col>
            <Row.Col md={7}>
                <Menu right>
                    <Menu.Item>About</Menu.Item>
                    <Menu.Item active>Contact</Menu.Item>
                    <Menu.Item>Terms of Service</Menu.Item>
                </Menu>
            </Row.Col>
        </Row>
    </Container>
</PageHead>`;

const EXAMPLE_PAGEHEAD_OVERVIEW =
`<PageHead>
    <Container>
        <Overview>
            <Overview.Title>
                <Overview.StepTitle href="/">
                    myorg
                </Overview.StepTitle>
                <Overview.StepDivider />
                <Overview.StepTitle primary>
                    My Book
                </Overview.StepTitle>
            </Overview.Title>
            <Overview.Note>
                Updated 2 days ago
            </Overview.Note>
        </Overview>
    </Container>
    <Container>
        <Menu left>
            <Menu.Item>Overview</Menu.Item>
            <Menu.Item active>Metrics</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
        </Menu>
    </Container>
</PageHead>`;

const EXAMPLE_PAGEHEAD_SEARCH =
`<PageHead>
    <Container>
        <Row>
            <Row.Col md={8}>
                <PageHead.Title>
                    <Icon id="star" size="sm" /> Explore GitBook
                </PageHead.Title>
            </Row.Col>
            <Row.Col md={4}>
                <SearchBar placeholder="Search books" />
            </Row.Col>
        </Row>
    </Container>
</PageHead>`;

const EXAMPLE_FILTERLIST =
`<FilterList>
    <FilterList.Item selected={true} count={21}>First filter</FilterList.Item>
    <FilterList.Item count={3}>Second filter</FilterList.Item>
    <FilterList.Item>Third filter</FilterList.Item>
</FilterList>`;

const EXAMPLE_PAGINATION =
'<Pagination page={4} pages={20} pagesToList={3} />';

export default () => {
    return (
        <Page title="Navigation" active="navigation">
            <Panel>
                <Panel.Heading title="Navigation" />
                <Panel.Body>
                    <p>This styleguide comes with several navigation components. Some were designed with singular purposes, while others were design to be more flexible and appear quite frequently.</p>
                    <CodeEditor source={EXAMPLE_IMPORTS} />
                </Panel.Body>
            </Panel>

            <Example title="Page head with menu" source={EXAMPLE_PAGEHEAD_MENU} scope={SCOPE} />

            <Example title="Page head with search bar" source={EXAMPLE_PAGEHEAD_SEARCH} scope={SCOPE} />

            <Example title="Page head with overview" source={EXAMPLE_PAGEHEAD_OVERVIEW} scope={SCOPE} />

            <Example title="Menu" source={EXAMPLE_MENU} scope={SCOPE}>
                The menu is a vertical list of navigational links. It should be put in a panel.
            </Example>

            <Example title="Filter list" source={EXAMPLE_FILTERLIST} scope={SCOPE}>
                A vertical list of filters. Grey text on white background. Selecting a filter from the list will fill its background with blue and make the text white.
            </Example>

            <Example title="Pagination" source={EXAMPLE_PAGINATION} scope={SCOPE}>

            </Example>
        </Page>
    );
};
