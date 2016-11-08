const React = require('react');
const { transform } = require('babel-standalone');
const Highlight = require('react-highlight');

const Panel = require('../../src/Panel');

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

    render() {
        const { title, children, source, scope } = this.props;
        const result = evalCode(source, scope);

        return (
            <Panel>
                <Panel.Heading title={title} />
                {children ? <Panel.Body>{children}</Panel.Body> : null}
                <Panel.Body>
                    {result}
                </Panel.Body>
                <Panel.Body>
                    <Highlight className="javascript">{source}</Highlight>
                </Panel.Body>
            </Panel>
        );
    }
});

module.exports = Example;
