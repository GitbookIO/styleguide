const React = require('react');
const octicons = require('octicons');

const Page = require('./components/Page');
const Panel = require('../src/Panel');
const Container = require('../src/Container');
const Row = require('../src/Row');
const Octicon = require('../src/Octicon');
const LogoText = require('../icons/LogoText');
const Logo = require('../icons/Logo');

const CodeEditor = require('./components/CodeEditor');

const SOURCE_IMPORT =
`const LogoText = require('gitbook-styleguide/lib/LogoText');
const Octicon = require('gitbook-styleguide/lib/Octicon');`;

const LOGOS = [
    { source: '<LogoText />', component: LogoText },
    { source: '<Logo />', component: Logo }
];

const OCTICONS = Object.keys(octicons)
    .map(id => {
        return {
            source: `<Octicon id="${id}" />`,
            component: () => <Octicon id={id} />
        };
    });

const IconsSet = React.createClass({
    propTypes: {
        icons: React.PropTypes.array.isRequired,
        perLine: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            perLine: 4
        };
    },

    render() {
        const { icons, perLine } = this.props;
        let lines = [];

        while (icons.length > 0) {
            const cells = icons.splice(0, perLine);
            lines.push(<Row>
                {cells.map(cell => {
                    return (
                        <Row.Col md={12 / perLine}>
                            <Panel>
                                <Panel.Body>
                                    <div style={{textAlign: 'center'}}>
                                        {<cell.component />}
                                    </div>
                                </Panel.Body>
                                <Panel.Footer>
                                    <div style={{textAlign: 'center'}}>
                                        <code>{cell.source}</code>
                                    </div>
                                </Panel.Footer>
                            </Panel>
                        </Row.Col>
                    );
                })}
            </Row>);
        }

        return (
            <Container fluid>
                {lines}
            </Container>
        );
    }
});


export default () => {
    return (
        <Page title="Logos and Icons" active="icons">
            <Panel>
                <Panel.Heading title="Logos and Icons" />
                <Panel.Body>
                    <p>The styleguide provides all logos and icons as react component (rendered as an SVG).</p>
                    <p>GitBook Styleguide is currently providing the octicons icons set.</p>
                    <CodeEditor source={SOURCE_IMPORT} />
                </Panel.Body>
            </Panel>
            <IconsSet icons={LOGOS} />
            <IconsSet icons={OCTICONS} />
        </Page>
    );
};
