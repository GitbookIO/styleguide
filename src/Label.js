const React = require('react');
const classNames = require('classnames');

const STYLES = require('./STYLES');

const Label = React.createClass({
    propTypes: {
        style: React.PropTypes.oneOf(STYLES),
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            style: STYLES[0]
        };
    },

    render() {
        const style     = this.props.style;
        const className = classNames('label', 'label-' + style, this.props.className);

        return (
            <span className={className}>
                {this.props.children}
            </span>
        );
    }
});

/**
 * Create a style for labels
 * @param {String} style
 * @return {React.Component}
 */
function createLabelStyle(style) {
    return React.createClass({
        displayName: Label.displayName + style,
        render() {
            return <Label {...this.props} style={style.toLowerCase()} />;
        }
    });
}

module.exports         = Label;
module.exports.Info    = createLabelStyle('Info');
module.exports.Danger  = createLabelStyle('Danger');
module.exports.Success = createLabelStyle('Success');
module.exports.Warning = createLabelStyle('Warning');
