const React = require('react');
const Slate = require('slate');
const Prism = require('slate-prism');
require('prismjs/components/prism-jsx');

const plugins = [
    Prism({
        onlyIn: node => true,
        getSyntax: node => 'jsx'
    })
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
        return {
            state: Slate.Plain.deserialize(source)
        };
    },

    // Editor has been modified
    onChange(state) {
        const source = Slate.Plain.serialize(state);
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
