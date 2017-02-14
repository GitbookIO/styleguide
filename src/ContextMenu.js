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
        component:   React.PropTypes.func.isRequired,
        children: React.PropTypes.node.isRequired
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
        event.preventDefault();
        event.stopPropagation();

        const x = event.clientX;
        const y = event.clientY;

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

        const menu = React.createElement(component, otherProps);

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
