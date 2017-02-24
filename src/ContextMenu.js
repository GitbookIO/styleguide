const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');

const Backdrop = require('./Backdrop');
const Dropdown = require('./Dropdown');

const MENU_RIGHT_SPACING = 300;
const MENU_BOTTOM_SPACING = 160;

/**
 * Helper to display a context menu.
 *
 *  <ContextMenu component={() => <ContextMenu.Menu></ContextMenu.Menu>}>
 *    Right click here !
 *  </ContextMenu>
 *
 * @type {ReactClass}
 */
const ContextMenu = React.createClass({
    propTypes: {
        // Delay before opening the menu
        // It should be use when integrating the context menu with a textarea and a selection event
        delay:           React.PropTypes.number,
        // Should it prevent the default menu ?
        preventDefault:  React.PropTypes.bool,
        // Should it be propaged to parent ?
        stopPropagation: React.PropTypes.bool,
        // Component to render for the menu
        component:       React.PropTypes.func.isRequired,
        children:        React.PropTypes.node.isRequired
    },

    getDefaultProps() {
        return {
            delay: 0,
            preventDefault: true,
            stopPropagation: true
        };
    },

    getInitialState() {
        return {
            open: false,
            x: 0,
            y: 0,
            directionH: 'e',
            directionV: 's'
        };
    },

    /**
     * When user is opening context menu.
     */
    onOpen(event) {
        const { delay, preventDefault, stopPropagation } = this.props;

        if (preventDefault) {
            event.preventDefault();
        }
        if (stopPropagation) {
            event.stopPropagation();
        }

        const x = event.clientX;
        const y = event.clientY;

        if (delay) {
            setTimeout(() => this.open(x, y), delay);
        } else {
            this.open(x, y);
        }
    },

    /**
     * Open the menu at position x,y
     */
    open(x, y) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.setState({
            open: true,
            x,
            y,
            directionH: x > (width - MENU_RIGHT_SPACING) ? 'w' : 'e',
            directionV: y > (height - MENU_BOTTOM_SPACING) ? 'n' : 's'
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

    /**
     * Close the menu after any click on the window.
     * We wait next event loop to avoid hiding the menu before the click got propaged to it.
     */
    onWindowClick() {
        setTimeout(() => this.onClose(), 1);
    },

    bindEvents() {
        const el = ReactDOM.findDOMNode(this);
        el.addEventListener('contextmenu', this.onOpen, false);
        el.addEventListener('click', this.onWindowClick, false);
    },

    unbindEvents() {
        const el = ReactDOM.findDOMNode(this);
        el.removeEventListener('contextmenu', this.onOpen, false);
        el.removeEventListener('click', this.onWindowClick, false);
    },

    componentDidMount() {
        this.bindEvents();
    },

    componentWillUnmount() {
        this.unbindEvents();
    },

    componentWillUpdate() {
        this.unbindEvents();
    },

    componentDidUpdate() {
        this.bindEvents();
    },

    render() {
        const { children, component, ...otherProps } = this.props;
        const { open, x, y, directionH, directionV } = this.state;

        const inner = React.Children.only(children);

        if (!open) {
            return inner;
        }

        const menu = React.createElement(component, {
            // Pass the current position if we use a specific menu component.
            mouseX: x,
            mouseY: y,
            ...otherProps
        });

        return (
            <Backdrop wrapper={inner} onClose={this.onClose}>
                <div
                    className={classNames('ContextMenu', `direction-${directionH}`, `direction-${directionV}`)}
                    style={{ top: y, left: x }}
                    onClick={this.onClick}>
                    {menu}
                </div>
            </Backdrop>
        );
    }
});

module.exports = ContextMenu;
module.exports.Divider     = Dropdown.Divider;
module.exports.Header      = Dropdown.Header;
module.exports.Item        = Dropdown.Item;
module.exports.Menu        = Dropdown.Menu;
