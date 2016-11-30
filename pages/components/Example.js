const React = require('react');
const { transform } = require('babel-standalone');

const Alert = require('../../src/Alert');
const Panel = require('../../src/Panel');
const CodeEditor = require('./CodeEditor');

const STYLE_PRE_ERROR = {
    padding: 0,
    background: 'none',
    color: 'inherit',
    border: 'none',
    margin: 0
};

function evalCode(code, scope, initialState = {}) {
    // Wrap in a function
    code =
`(React.createClass({
    getInitialState() {
        return ${JSON.stringify(initialState)};
    },

    render() {
        const {${Object.keys(scope).join(',')}} = this.props;
        return <div>${code}</div>
    }
}))`;

    // Compile with babel
    code = transform(code, { presets: ['es2015', 'react', 'stage-1'] }).code;

    const Component = eval(code);
    return <Component {...scope} />;
}

const Example = React.createClass({
    propTypes: {
        title:    React.PropTypes.string,
        source:   React.PropTypes.string,
        children: React.PropTypes.node,
        scope:    React.PropTypes.object,
        state:    React.PropTypes.object
    },

    getDefaultProps() {
        return {
            scope: {}
        };
    },

    // Setup initial state for editor
    getInitialState() {
        const { source } = this.props;
        return { source };
    },

    // Editor has been modified
    onChange(source) {
        this.setState({ source });
    },

    render() {
        const { title, children, scope, state } = this.props;
        const { source } = this.state;

        let result;
        try {
            result = evalCode(source, scope, state);
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
                    <CodeEditor source={source} onChange={this.onChange} />
                </Panel.Body>
            </Panel>
        );
    }
});

module.exports = Example;
