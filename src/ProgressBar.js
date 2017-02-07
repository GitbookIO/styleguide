const React = require('react');
const classNames = require('classnames');

const Button = require('./Button');
const SIZES = require('./SIZES');
const STYLES = require('./STYLES');

/**
 * Displays an inline progress bar.
 *
 * @type {ReactClass}
 */
const ProgressBar = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        // Progress between 0 and max
        value:     React.PropTypes.number,
        max:       React.PropTypes.number,
        // Size of the bar
        size:      React.PropTypes.oneOf(SIZES),
        style:     React.PropTypes.oneOf(STYLES)
    },

    getDefaultProps() {
        return {
            value: 0,
            max:   100,
            size:  'md',
            style: 'success'
        };
    },

    render() {
        const { size, style, value, max } = this.props;

        const className = classNames(
            'ProgressBar',
            `size-${size}`,
            `style-${style}`,
            this.props.className
        );

        const percent = (value * 100) / max;

        return (
            <div className={className}>
                <div className="bar" style={{ width: `${percent}%` }}></div>
            </div>
        );
    }
});

/**
 * Display a progress bar in a button like container.
 * Perfect for insertion in a toolbar.
 *
 * @type {ReactClass}
 */
const ProgressBarButton = React.createClass({
    propTypes: {
        size:      React.PropTypes.oneOf(SIZES),
        className: React.PropTypes.string,
        children:  React.PropTypes.node
    },

    render() {
        let { children, className, ...props } = this.props;

        className = classNames(
            'ProgressBarButton',
            className
        );

        return (
            <Button className={className} {...props}>
                {children}
            </Button>
        );
    }
});

module.exports = ProgressBar;
module.exports.Button = ProgressBarButton;
