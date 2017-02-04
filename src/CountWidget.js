const React = require('react');

const CountWidget = React.createClass({
    propTypes: {
        left: React.PropTypes.number.isRequired,
        right: React.PropTypes.number.isRequired,
        // min-width for rendered element
        minWidth: React.PropTypes.number
    },

    render() {
        const { left, right, minWidth } = this.props;

        // Total count
        const total = left + right;

        const countHalfStyle = {};
        if (minWidth) {
            countHalfStyle.minWidth = `${minWidth / 2}px`;
        }

        return (
            <div className="CountWidget">
                <div className="CountHalf" style={countHalfStyle}>
                    <div className="CountValue">
                        {left}
                    </div>
                    <span className="CountBar CountBar-Left" style={{ width: `${100 * left / total}%` }}>
                        <div className="CountMeter" />
                    </span>
                </div>
                <div className="CountHalf" style={countHalfStyle}>
                    <div className="CountValue">
                        {right}
                    </div>
                    <span className="CountBar CountBar-Right" style={{ width: `${100 * right / total}%` }}>
                        <div className="CountMeter" />
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = CountWidget;
