const React = require('react');

/**
 * Component to represent a scrollable content,
 * scroll position can be set as a percent.
 *
 * @type {ReactType}
 */
const ScrollArea = React.createClass({
    propTypes: {
        children:   React.PropTypes.node,
        // Position of scrolling
        top:        React.PropTypes.number,
        // Debouncing interval
        debouncing: React.PropTypes.number,
        // When scrolling
        onScroll:   React.PropTypes.func
    },

    getDefaultProps() {
        return {
            debouncing: 5
        };
    },

    onDebouncedScroll(e) {
        const { onScroll } = this.props;
        const container = this.refs.scroller;

        if (!container || !onScroll) {
            return;
        }

        let scrollPercentage = container.scrollTop / (container.scrollHeight - (container.offsetHeight));
        if (scrollPercentage > 1) {
            scrollPercentage = 1;
        } else if (scrollPercentage < 0) {
            scrollPercentage = 0;
        }

        onScroll(scrollPercentage);
    },

    onScroll(e) {
        const { debouncing } = this.props;
        this.cancelDebouncing();
        this.timeout = setTimeout(() => this.onDebouncedScroll(e), debouncing);
    },

    cancelDebouncing() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    },

    setScroll() {
        const { top } = this.props;
        const el = this.refs.scroller;

        if (el) {
            el.scrollTop = top * (el.scrollHeight - el.offsetHeight);
        }
    },

    componentDidUpdate(prevProps) {
        if (prevProps.top == this.props.top) {
            return;
        }

        this.setScroll();
    },

    componentDidMount() {
        this.setScroll();
    },

    componentWillUnmount() {
        this.cancelDebouncing();
    },

    render() {
        const { children, ...props } = this.props;

        return (
            <div
                ref="scroller"
                className="ScrollArea"
                onScroll={this.onScroll}
                {...props}>
                {children}
            </div>
        );
    }
});

module.exports = ScrollArea;
