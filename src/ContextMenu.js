const React = require('react');
const ReactDOM = require('react-dom');

const Backdrop = require('./Backdrop');

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
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            open: true,
            x: event.clientX,
            y: event.clientY
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
        const { open, x, y } = this.state;

        const inner = React.Children.only(children);

        if (!open) {
            return inner;
        }

        const menu = React.createElement(component, otherProps);

        return (
            <Backdrop wrapper={inner} onClose={this.onClose}>
                <div className="ContextMenu" style={{ top: y, left: x }}>
                    {menu}
                </div>
            </Backdrop>
        );
    }
});

module.exports = ContextMenu;
