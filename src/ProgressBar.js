const React = require('react');
const { bool, number } = React.PropTypes;

/**
 * Displays a progress bar (YouTube-like) at the top of container
 */
const ProgressBar = React.createClass({
    propTypes: {
        show:  bool,
        // 0 < percent < 1
        percent: number
    },

    getDefaultProps: function () {
        return {
            show: false,
            percent: 0.3
        };
    },

    getInitialState: function () {
        return {
            percent: 0
        };
    },

    getBarStyle: function () {
        const { show, percent } = this.props;

        return {
            width: percent * 100 + '%',
            display: show && percent > 0 ? 'block': 'none'
        };
    },

    getShadowStyle: function () {
        const { show, percent } = this.props;

        return {
            display: show && percent > 0 ? 'block': 'none'
        };
    },

    render: function () {
        return <div className="progress-bar">
            <div className="bar" style={this.getBarStyle()}>
                <div className="progress-bar-shadow"
                     style={this.getShadowStyle()}>
                </div>
            </div>
        </div>;
    }
});

module.exports = ProgressBar;
