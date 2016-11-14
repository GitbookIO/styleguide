const React = require('react');
const Slate = require('slate');
const Prism = require('slate-prism');
const { transform } = require('babel-standalone');

const Alert = require('../../src/Alert');
const Panel = require('../../src/Panel');

const STYLE_PRE_ERROR = {
    padding: 0,
    background: 'none',
    color: 'inherit',
    border: 'none',
    margin: 0
};

const plugins = [
    Prism({
        onlyIn: node => true,
        getSyntax: node => 'javascript'
    })
];

function evalCode(code, scope) {
    // Wrap multiline JSX
    code = `<div>${code}</div>`;

    // Wrap in a function
    code = `
        (({${Object.keys(scope).join(',')}}) => ${code});
    `;

    // Compile with babel
    code = transform(code, { presets: ['es2015', 'react', 'stage-1'] }).code;

    return eval(code)(scope);
}

const Example = React.createClass({
    propTypes: {
        title:    React.PropTypes.string,
        source:   React.PropTypes.string,
        children: React.PropTypes.node,
        scope:    React.PropTypes.object
    },

    getDefaultProps() {
        return {
            scope: {}
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
        this.setState({ state });
    },

    render() {
        const { title, children, scope } = this.props;
        const { state } = this.state;
        const source = Slate.Plain.serialize(state);

        let result;
        try {
            result = evalCode(source, scope);
        } catch (error) {
            result = (
                <Alert.Danger>
                    <pre style={STYLE_PRE_ERROR}>{error.message}</pre>
                </Alert.Danger>
            );
        }

        return (
            <Panel>
                <Panel.Heading title={title} />
                {children ? <Panel.Body>{children}</Panel.Body> : null}
                <Panel.Body>
                    {result}
                </Panel.Body>
                <Panel.Body>
                    <pre>
                        <Slate.Editor
                            state={state}
                            plugins={plugins}
                            onChange={this.onChange}
                        />
                    </pre>
                </Panel.Body>
            </Panel>
        );
    }
});

module.exports = Example;
