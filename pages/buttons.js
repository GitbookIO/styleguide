const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Button = require('../src/Button');

const EXAMPLE_DEFAULT =
`<Button>Button button</Button>
<Button href="#">Link button</Button>`;

const EXAMPLE_SIZES =
`<Button size="lg">Large button</Button>
<Button size="md">Normal button</Button>
<Button size="sm">Small button</Button>
<Button size="xs">Extra small button</Button>`;

const EXAMPLE_STYLES =
`<Button style="primary">Primary button</Button>
<Button style="success">Success button</Button>
<Button style="danger">Danger button</Button>
<Button style="secondary">Secondary button</Button>`;

const EXAMPLE_BLOCK =
`<Button block style="primary">Primary block button</Button>
<Button block>Secondary button</Button>`;


export default () => {
    return (
        <Page title="Buttons" active="buttons">
            <Panel>
                <Panel.Heading title="Buttons" />
                <Panel.Body>
                    <p>Buttons are used for actions, like in forms, while textual hyperlinks are used for destinations, or moving from one page to another.</p>
                    <CodeEditor source="const Button = require('gitbook-styleguide/lib/Button');" />
                </Panel.Body>
            </Panel>

            <Example title="Default buttons" source={EXAMPLE_DEFAULT} scope={{React, Button}}></Example>

            <Example title="Sizes" source={EXAMPLE_SIZES} scope={{React, Button}}>
                Buttons are availables in multiples sizes: Large, Normal, Small and Extra-Small.
            </Example>

            <Example title="Styles" source={EXAMPLE_STYLES} scope={{React, Button}}>
                Buttons can be filled to indicate a more important action:
            </Example>

            <Example title="Block buttons" source={EXAMPLE_BLOCK} scope={{React, Button}}>
                Create block level buttons—those that span the full width of a parent:
            </Example>
        </Page>
    );
};
