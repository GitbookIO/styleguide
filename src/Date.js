var React = require('react');
var moment = require('moment');

var DateSpan =  React.createClass({
    propTypes: {
        date: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.instanceOf(Date)
        ]).isRequired,

        refreshInterval: React.PropTypes.number,
        format:          React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            format:          '',
            refreshInterval: 10*1000
        };
    },

    getInitialState: function() {
        return {
            currentDate: Date.now()
        };
    },

    tick: function() {
        // Update "fake" internal state to trigger re-rendering
        this.setState({
            currentDate: Date.now()
        });
    },

    componentDidMount: function() {
        if (!this.props.format) {
            this.interval = setInterval(this.tick, this.props.refreshInterval);
        }
    },

    componentWillUnmount: function() {
        if (!this.props.format) {
            clearInterval(this.interval);
        }
    },

    render: function() {
        var date   = this.props.date;
        var format = this.props.format;

        // Display interval by default
        var displayDate = moment(date).fromNow();
        // Apply formating if provided
        if (Boolean(format)) {
            displayDate = moment(date).format(format);
        }

        return <span>{displayDate}</span>;
    }
});

module.exports = DateSpan;
