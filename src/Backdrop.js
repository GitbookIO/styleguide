const React = require('react');
const ReactDOM = require('react-dom');

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const SCROLLING_KEYS = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

/**
 * Backdrop for modals, dropdown, popover.
 *
 *
 * For example:
 *
 * <Backdrop onClose={onClosePopover}>
 *      <Popover>...</Popover>
 * </Backdrop>
 */
const Backdrop = React.createClass({
    propTypes: {
        // Scroll is enabled ?
        scroll:   React.PropTypes.bool,
        // Close on escape
        escape:   React.PropTypes.bool,
        // Z-index for the backdrop
        zIndex:   React.PropTypes.number,
        // Callback when backdrop is closed
        onClose:  React.PropTypes.func.isRequired,
        children: React.PropTypes.node.isRequired,
        wrapper:  React.PropTypes.node
    },

    getDefaultProps() {
        return {
            scroll: false,
            escape: true,
            zIndex: 200,
            wrapper: <div />
        };
    },

    onClose() {
        const { onClose } = this.props;
        onClose();
    },

    /**
     * Clicking should close the backdrop.
     */
    onClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.onClose();
    },

    /**
     * Escape should close the backdrop
     */
    onKeyDown(event) {
        const { escape } = this.props;

        if (event.keyCode === 27 && escape) {
            this.onClose();
        }

        if (SCROLLING_KEYS[event.keyCode]) {
            event.preventDefault();
            return false;
        }
    },

    /**
     * Prevent scroll on wrapper itself.
     */
    onScroll(event) {
        const { scroll } = this.props;
        if (scroll) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
    },

    bindEvents() {
        const container = ReactDOM.findDOMNode(this.refs.wrapper);

        window.addEventListener('keydown', this.onKeyDown);
        container.addEventListener('scroll', this.onScroll);
        container.addEventListener('wheel', this.onScroll);
    },

    unbindEvents() {
        const container = ReactDOM.findDOMNode(this.refs.wrapper);

        window.removeEventListener('keydown', this.onKeyDown);
        container.removeEventListener('scroll', this.onScroll);
        container.removeEventListener('wheel', this.onScroll);
    },

    componentDidMount() {
        this.bindEvents();
    },

    componentWillUpdate() {
        this.unbindEvents();
    },

    componentDidUpdate() {
        this.bindEvents();
    },

    componentWillUnmount() {
        this.unbindEvents();
    },

    render() {
        const { zIndex, wrapper, children } = this.props;
        const style = {
            zIndex,
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%'
        };

        return React.cloneElement(wrapper, { ref: 'wrapper' },
            <div
                className="Backdrop"
                ref="backdrop"
                style={style}
                onClick={this.onClick}
                />,
            wrapper.props.children,
            children
        );
    }
});

module.exports = Backdrop;
