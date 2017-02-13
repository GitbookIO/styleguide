const React = require('react');
const ReactDOM = require('react-dom');
const classNames = require('classnames');

const Backdrop = require('./Backdrop');

const MENU_RIGHT_SPACING = 300;

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
            y: 0,
            direction: 'e'
        };
    },

    /**
     * When user is opening context menu.
     */
    onOpen(event) {
        event.preventDefault();
        event.stopPropagation();

        const width = window.innerWidth;

        this.setState({
            open: true,
            x: event.clientX,
            y: event.clientY,
            direction: event.clientX > (width - MENU_RIGHT_SPACING) ? 'w' : 'e'
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

    bindEvents() {
        const el = ReactDOM.findDOMNode(this);
        el.addEventListener('contextmenu', this.onOpen, false);
    },

    unbindEvents() {
        const el = ReactDOM.findDOMNode(this);
        el.removeEventListener('contextmenu', this.onOpen, false);
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
        const { open, x, y, direction } = this.state;

        const inner = React.Children.only(children);

        if (!open) {
            return inner;
        }

        const menu = React.createElement(component, otherProps);

        return (
            <Backdrop wrapper={inner} onClose={this.onClose}>
                <div className={classNames('ContextMenu', `direction-${direction}`)} style={{ top: y, left: x }}>
                    {menu}
                </div>
            </Backdrop>
        );
    }
});

module.exports = ContextMenu;
