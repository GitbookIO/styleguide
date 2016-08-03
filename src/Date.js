const React = require('react');
const moment = require('moment');

const dateShape = React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
    React.PropTypes.instanceOf(Date)
]);

const DateSpan =  React.createClass({
    propTypes: {
        date:            dateShape.isRequired,
        refreshInterval: React.PropTypes.number,
        format:          React.PropTypes.string
    },

    contextTypes: {
        now: dateShape
    },

    getDefaultProps: function() {
        return {
            format:          '',
            refreshInterval: 10*1000
        };
    },

    getInitialState: function() {
        return {
            tick: 0
        };
    },

    tick: function() {
        // Update "fake" internal state to trigger re-rendering
        let { tick } = this.state;

        this.setState({
            tick: tick + 1
        });
    },

    componentDidMount: function() {
        if (this.props.format) {
            return;
        }

        this.interval = setInterval(this.tick, this.props.refreshInterval);
    },

    componentWillUnmount: function() {
        if (this.interval) {
            return;
        }

        clearInterval(this.interval);
    },

    render: function() {
        let { date, format } = this.props;
        let { now } = this.context;
        let displayDate;

        // Apply formating if provided
        if (format) {
            displayDate = moment(date).format(format);
        } else {
            displayDate = moment(date).from(now);
        }

        return <span>{displayDate}</span>;
    }
});

const DateContext =  React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        now:      dateShape
    },

    childContextTypes: {
        now: dateShape
    },

    getChildContext: function() {
        return {
            now: this.props.now
        };
    },

    render: function() {
        return (React.Children.only(this.props.children));
    }
});

module.exports = DateSpan;
module.exports.shape = dateShape;
module.exports.Context = DateContext;
