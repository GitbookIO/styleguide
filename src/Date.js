var React = require('react');
var moment = require('moment');

var DateSpan =  React.createClass({
    propTypes: {
        date: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.instanceOf(Date)
        ]).isRequired,

        refreshInterval: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            refreshInterval: 10*1000
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
        var date = this.props.date;
        return <span>{moment(date).fromNow()}</span>;
    }
});

module.exports = DateSpan;
