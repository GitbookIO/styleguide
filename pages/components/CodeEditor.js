const { List } = require('immutable');
const React = require('react');
const Slate = require('slate');
const Prism = require('slate-prism');
const EditCode = require('slate-edit-code');
require('prismjs/components/prism-jsx');

const prism = Prism({
    onlyIn: node => node.type == 'code_block',
    getSyntax: node => 'jsx'
});

const editCode = EditCode({
    allowMarks: false,
    containerType: 'code_block',
    exitBlockType: null,
    lineType: 'code_line',
    selectAll: false
});

const plugins = [
    prism,
    editCode
];

const CodeEditor = React.createClass({
    propTypes: {
        source:   React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            source: ''
        };
    },

    // Setup initial state for editor
    getInitialState() {
        const { source } = this.props;

        // Reset the key generate to fix potential server side issue
        Slate.resetKeyGenerator();

        const codeBlock = editCode.utils.deserializeCode(source);
        const document = Slate.Document.create({ nodes: List([codeBlock]) });

        return {
            state: Slate.State.create({ document })
        };
    },

    // Editor has been modified
    onChange(state) {
        const source = state.document.getTexts()
            .map(t => t.text)
            .join('\n');

        this.setState({ state });
        this.props.onChange(source);
    },

    render() {
        const { state } = this.state;

        return (
            <pre>
                <Slate.Editor
                    spellCheck={false}
                    state={state}
                    plugins={plugins}
                    onChange={this.onChange}
                />
            </pre>
        );
    }
});

module.exports = CodeEditor;
