const React = require('react');

const Page = require('./components/Page');
const Panel = require('../src/Panel');
const Container = require('../src/Container');
const Row = require('../src/Row');

const LogoText = require('../icons/LogoText');
const Logo = require('../icons/Logo');


const LOGOS = [
    { id: 'LogoText', component: LogoText },
    { id: 'Logo', component: Logo }
];

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
                                        <code>{`<${cell.id} />`}</code>
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
                    <pre>
                        const LogoText = require('gitbook-styleguide/icons/LogoText');
                    </pre>
                </Panel.Body>
            </Panel>
            <IconsSet icons={LOGOS} />
        </Page>
    );
};
