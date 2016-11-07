const React = require('react');
const Page = require('./components/Page');
const Panel = require('../src/Panel');
const Button = require('../src/Button');

const EXAMPLE_DEFAULT =
`<Button>Button button</Button>
<Button href="#">Link button</Button>`;

module.exports = () => {
    return (
        <Page title="Buttons" active="buttons">
            <Panel>
                <Panel.Heading title="Buttons" />
                <Panel.Body>
                    <p>Buttons are used for actions, like in forms, while textual hyperlinks are used for destinations, or moving from one page to another.</p>
                </Panel.Body>
            </Panel>

            <Panel>
                <Panel.Heading title="Default buttons" />
                <Panel.Body>
                    <Button>Button button</Button>{' '}
                    <Button href="#">Link button</Button>
                </Panel.Body>
                <Panel.Body>
                    <pre>
                        {EXAMPLE_DEFAULT}
                    </pre>
                </Panel.Body>
            </Panel>

            <Panel>
                <Panel.Heading title="Sizes" />
                <Panel.Body>
                    <Button size="lg">Large button</Button> <Button size="md">Normal button</Button> <Button size="sm">Small button</Button>
                </Panel.Body>
                <Panel.Body>
                    <pre>
                        {EXAMPLE_DEFAULT}
                    </pre>
                </Panel.Body>
            </Panel>
        </Page>
    );
};
