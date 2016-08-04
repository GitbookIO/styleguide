const React = require('react');
const moment = require('moment');

const dateShape = React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
    React.PropTypes.instanceOf(Date)
]);

const DateSpan =  React.createClass({
    propTypes: {
        // Date to display
        date:    dateShape.isRequired,
        // Interval to refresh the display
        refresh: React.PropTypes.number,
        // Format for output
        format:  React.PropTypes.string,
        // Is the date in UTC or Local
        utc:     React.PropTypes.bool
    },

    contextTypes: {
        now: dateShape
    },

    getDefaultProps: function() {
        return {
            format:   '',
            refresh: 10*1000,
            utc:      true
        };
    },

    getInitialState: function() {
        return {
            now: 0
        };
    },

    tick: function() {
        this.setState({
            now: Date.now()
        });
    },

    componentDidMount: function() {
        let { refresh, format } = this.props;

        if (format) {
            return;
        }

        this.interval = setInterval(this.tick, refresh);
    },

    componentWillUnmount: function() {
        if (!this.interval) {
            return;
        }

        clearInterval(this.interval);
    },

    render: function() {
        let { date, format, utc } = this.props;
        let now = this.state.now || this.context.now;
        let displayDate;

        // Parse the date
        if (utc) {
            date = moment.utc(date);
        } else {
            date = moment(date);
        }

        // Apply formating if provided
        if (format) {
            displayDate = date.local().format(format);
        } else {
            displayDate = date.from(now);
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
