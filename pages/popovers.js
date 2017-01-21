const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Popover = require('../src/Popover');
const Input = require('../src/Input');
const Icon = require('../src/Icon');
const Button = require('../src/Button');

const SCOPE = { React, Panel, Popover, Button, Input, Icon };

const EXAMPLE_IMPORT =
'const Popover = require(\'gitbook-styleguide/lib/Popover\');';

const EXAMPLE_DEFAULT =
`<Popover>
    <Popover.Heading title="Hello" />
    <Popover.Body>
        Inner body of the popover.
    </Popover.Body>
    <Popover.Controls>
        <Popover.Control active onClick={event => alert('Hello')}>
            Say Hello
        </Popover.Control>
        <Popover.Control onClick={event => alert('World')}>
            Say World
        </Popover.Control>
    </Popover.Controls>
</Popover>`;

const EXAMPLE_WITH_INPUT =
`<Popover>
    <Popover.Heading>
        <Popover.Title>
            <Icon id="pencil" /> Edit title
        </Popover.Title>
    </Popover.Heading>
    <Popover.Body>
        <Input placeholder="Some title" />
    </Popover.Body>
</Popover>`;

const EXAMPLE_BUTTON =
`<Popover.Container>
    <Button onClick={event => this.setState({ open: !this.state.open })}>
        Toggle Popover
    </Button>
    {this.state.open? (<Popover>
        <Popover.Heading title="Hello" />
        <Popover.Body>
            Inner body of the popover.
        </Popover.Body>
    </Popover>) : null}
</Popover.Container>`;

const EXAMPLE_POSITION =
`<div>{
    [
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
        'top-left'
    ].map(pos =>
        <Popover.Container key={pos}
                           onMouseEnter={() => this.setState({ [pos]: true })}
                           onMouseLeave={() => this.setState({ [pos]: false })}>
            <Button >
                {pos}
            </Button>
            { this.state[pos] ?
            <Popover position={pos}>
                <Popover.Body>{pos}</Popover.Body>
            </Popover>
            : null }
        </Popover.Container>
    )
}</div>`;

export default () => {
    return (
        <Page title="Popovers" active="popovers">
            <Panel>
                <Panel.Heading title="Popovers" />
                <Panel.Body>
                    <p>
                        Add small overlay content, like those found in iOS, to any element for housing secondary information.
                    </p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Example" source={EXAMPLE_DEFAULT} scope={SCOPE} />

            <Example title="With an input" source={EXAMPLE_WITH_INPUT} scope={SCOPE} />

            <Example title="With button and state" source={EXAMPLE_BUTTON} scope={SCOPE} />

            <Example title="With custom positioning" source={EXAMPLE_POSITION} scope={SCOPE} />
        </Page>
    );
};
