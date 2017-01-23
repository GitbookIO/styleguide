const React = require('react');
const moment = require('moment');
require('moment-duration-format');

const dateShape = React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
    React.PropTypes.instanceOf(Date)
]);

/**
 * Render an updated relative date or with a specific format.
 *
 * Relative date: <Date date={new Date(...)} />
 * With format: <Date date={new Date(...)} format="%Y %M" />
 */
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

    getDefaultProps() {
        return {
            format:  '',
            refresh: 10 * 1000,
            utc:     true
        };
    },

    getInitialState() {
        return {
            now: 0
        };
    },

    tick() {
        this.setState({
            now: Date.now()
        });
    },

    componentDidMount() {
        const { refresh, format } = this.props;

        // We tick only once to update date from utc to local
        if (format) {
            setTimeout(this.tick, 1000);
            return;
        }

        this.interval = setInterval(this.tick, refresh);
    },

    componentWillUnmount() {
        if (!this.interval) {
            return;
        }

        clearInterval(this.interval);
    },

    render() {
        const now = this.state.now || this.context.now;
        let { date, format, utc } = this.props;
        let displayDate;

        // Parse the date
        if (utc) {
            date = moment.utc(date);
        } else {
            date = moment(date);
        }

        // Apply formating if provided
        if (format) {
            // If client-side, we use the real date
            if (this.state.now) {
                date = date.local();
            }

            displayDate = date.format(format);
        } else {
            displayDate = date.from(now);
        }

        return <span>{displayDate}</span>;
    }
});

/**
 * Render an updated duration.
 *
 * <Date.Duration duration={6000} />
 */
const DateDuration = React.createClass({
    propTypes: {
        duration: React.PropTypes.number,
        format:   React.PropTypes.string,
        refresh:  React.PropTypes.number
    },

    getDefaultProps() {
        return {
            format: 'h [hrs], m [min], s [sec]',
            refresh: 1000
        };
    },

    getInitialState() {
        return {
            elapsed: 0
        };
    },

    tick() {
        const { elapsed } = this.state;
        const { refresh } = this.props;

        this.setState({
            elapsed: elapsed + refresh
        });
    },

    componentDidMount() {
        const { refresh } = this.props;
        if (refresh > 0) {
            this.interval = setInterval(this.tick, refresh);
        }
    },

    componentWillUnmount() {
        clearInterval(this.interval);
    },

    render() {
        let { duration, format } = this.props;
        const { elapsed } = this.state;

        duration = duration + elapsed;

        return (
            <span>{moment.duration(duration).format(format)}</span>
        );
    }
});

const DateContext = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        now:      dateShape
    },

    childContextTypes: {
        now: dateShape
    },

    getChildContext() {
        return {
            now: this.props.now
        };
    },

    render() {
        return (React.Children.only(this.props.children));
    }
});

module.exports          = DateSpan;
module.exports.shape    = dateShape;
module.exports.Context  = DateContext;
module.exports.Duration = DateDuration;
