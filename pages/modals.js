const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Modal = require('../src/Modal');
const Button = require('../src/Button');
const Backdrop = require('../src/Backdrop');

const SCOPE = { React, Modal, Button, Backdrop };

const EXAMPLE_IMPORT =
'const Modal = require(\'gitbook-styleguide/lib/Modal\');';

const EXAMPLE_DEFAULT =
`<Modal animated={false}>
    <Modal.Heading title="Title" />
    <Modal.Body>
        Body of the modal
    </Modal.Body>
    <Modal.Footer>
        <Button style="secondary">Cancel</Button>
        <Button style="primary">Important action</Button>
    </Modal.Footer>
</Modal>`;

const EXAMPLE_BACKDROP =
`
<Button onClick={event => this.setState({ open: true })}>Open modal</Button>
{this.state.open ?
    <Backdrop wrapper={<Modal.Backdrop />} onClose={event => this.setState({ open: false })}>
        <Modal>
            <Modal.Heading title="Title" />
            <Modal.Body>
                Body of the modal
            </Modal.Body>
            <Modal.Footer>
                <Button style="secondary" onClick={event => this.setState({ open: false })}>Cancel</Button>
                <Button style="primary">Important action</Button>
            </Modal.Footer>
        </Modal>
    </Backdrop>
: null}`;

export default () => {
    return (
        <Page title="Modals" active="modals">
            <Panel>
                <Panel.Heading title="Modals" />
                <Panel.Body>
                    <p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p>
                    <CodeEditor source={EXAMPLE_IMPORT} />
                </Panel.Body>
            </Panel>

            <Example title="Example" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>
            <Example title="With a backdrop" source={EXAMPLE_BACKDROP} scope={SCOPE}></Example>
        </Page>
    );
};
