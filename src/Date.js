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
            refreshInterval: 10*1000,
            format:          ''
        };
    },

    getInitialState: function() {
        return {
            currentDate: Date.now()
        };
    },

    tick: function() {
        this.setState({
            currentDate: Date.now()
        });
    },

    componentDidMount: function() {
        this.interval = setInterval(this.tick, this.props.refreshInterval);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
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
