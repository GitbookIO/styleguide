const React = require('react');
const ReactDOM = require('react-dom');

const Backdrop = require('./Backdrop');

// Spacing with border of window
const WINDOW_MARGING = 20;

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const SCROLLING_KEYS = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

/**
 * Helper to display a context menu.
 *
 *  <ContextMenu component={() => <Dropdown></Dropdown>}>
 *    Right click here !
 *  </ContextMenu>
 *
 * @type {ReactClass}
 */
const ContextMenu = React.createClass({
    propTypes: {
        component:   React.PropTypes.func.isRequired,
        children: React.PropTypes.node.isRequired
    },

    getInitialState() {
        return {
            open: false,
            x: 0,
            y: 0
        };
    },

    /**
     * When user is opening context menu.
     */
    onOpen(event) {
        this.setState({
            open: true,
            x: event.pageX,
            y: event.pageY
        });
    },

    /**
     * When user is closing the menu.
     */
    onClose() {
        this.setState({
            open: false
        });
    },

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        el.addEventListener('contextmenu', this.onOpen, false);
    },

    componentWillUnmount() {
        const el = ReactDOM.findDOMNode(this);
        el.removeEventListener('contextmenu', this.onOpen, false);
    },

    render() {
        const { children, component, ...otherProps } = this.props;
        const { open, x, y } = this.state;

        const inner = React.Children.only(children);

        if (!open) {
            return inner;
        }

        const menu = React.createElement(component, otherProps);

        return (
            <Backdrop wrapper={inner} onClose={this.onClose}>
                {children}
                <div className="ContextMenu" style={{ top: y, left: x }}>
                    {menu}
                </div>
            </Backdrop>
        );
    }
});

module.exports = ContextMenu;
