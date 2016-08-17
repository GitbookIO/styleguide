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
        children: React.PropTypes.node.isRequired
    },

    getDefaultProps: function() {
        return {
            escape: true,
            zIndex: 200
        };
    },

    onClose: function() {
        const { onClose } = this.props;
        onClose();
    },

    onKeyDown: function(event) {
        const { escape } = this.props;

        if (event.keyCode === 27 && escape) {
            this.onClose();
        }
    },

    componentDidMount: function() {
        window.addEventListener('keydown', this.onKeyDown);
    },

    componentWillUnmount: function() {
        window.removeEventListener('keydown', this.onKeyDown);
    },

    render: function() {
        const { zIndex } = this.props;
        const style = {
            zIndex,
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%'
        };

        return (
            <div>
                <div style={style} onClick={this.onClose}></div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Backdrop;
