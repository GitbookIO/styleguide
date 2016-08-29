const React = require('react');

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
            escape: true,
            zIndex: 200,
            wrapper: <div />
        };
    },

    onClose() {
        const { onClose } = this.props;
        onClose();
    },

    onKeyDown(event) {
        const { escape } = this.props;

        if (event.keyCode === 27 && escape) {
            this.onClose();
        }
    },

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown);
    },

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    },

    render() {
        const { zIndex, wrapper } = this.props;
        const style = {
            zIndex,
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%'
        };

        return React.cloneElement(wrapper, {},
            <div style={style} onClick={this.onClose}></div>,
            wrapper.props.children,
            this.props.children
        );
    }
});

module.exports = Backdrop;
