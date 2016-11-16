const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Form = require('../src/Form');
const Input = require('../src/Input');
const Button = require('../src/Button');
const Select = require('../src/Select');

const SCOPE = { React, Form, Input, Button, Select };

const EXAMPLE_IMPORT =
`const Form = require('gitbook-styleguide/lib/Form');
const Input = require('gitbook-styleguide/lib/Input');`;

const EXAMPLE_DEFAULT =
`<Form>
    <Form.Group>
        <label>Name</label>
        <Input name="name" placeholder="John" />
    </Form.Group>
    <Form.Group>
        <label>Email address</label>
        <Input name="email" placeholder="john@doe.com" />
    </Form.Group>
    <Form.Actions>
        <Button type="submit" style="primary">Submit</Button>
        <Button type="cancel" style="secondary">Cancel</Button>
    </Form.Actions>
</Form>`;

const EXAMPLE_SIZES =
`<Input size="lg" placeholder="Large input" />
<Input size="md" placeholder="Normal input" />
<Input size="sm" placeholder="Small input" />
<Input size="xs" placeholder="Extra small input" />`;

const EXAMPLE_SELECT =
`<Select
    name="language"
    search={false}
    options={[
        'French',
        'English'
    ]}
/>`;

const EXAMPLE_SELECT_COMPLEX =
`<Select
    name="countries"
    filter={(query, option) => option.label.indexOf(query) >= 0}
    component={({option}) => <span>{option.label}</span>}
    options={[
        { id: 'US', label: 'United States' },
        { id: 'FR', label: 'France' },
        { id: 'UK', label: 'United Kingdom' }
    ]}
/>`;

export default () => {
    return (
        <Page title="Forms" active="forms">
            <Panel>
                <Panel.Heading title="Forms" />
                <Panel.Body>
                    <p>
                        These components are the basic building blocks for creating forms.{' '}
                        Each of these elements can be used individually throughout the site,{' '}
                        however it's recommended to use the field components when building forms{' '}
                        in order to take advantage of their accessibility and responsive features.
                    </p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Example form" source={EXAMPLE_DEFAULT} scope={SCOPE}>

            </Example>

            <Example title="Sizing" source={EXAMPLE_SIZES} scope={SCOPE}>
                Make inputs smaller, larger, or full-width with an additional property.
            </Example>

            <Example title="Complex Select" source={EXAMPLE_SELECT} scope={SCOPE}>
                HTML select are replaced by an input allowing more options (search, multiple values, custom renderers with icons, etc).
            </Example>

            <Example title="Complex Select" source={EXAMPLE_SELECT_COMPLEX} scope={SCOPE}>
                <code>Select</code> has different properties for customizing the rendering and the behaviour.
            </Example>
        </Page>
    );
};
