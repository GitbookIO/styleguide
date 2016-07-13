var React = require('react');
var classNames = require('classnames');

var PageWrapper = React.createClass({
    propTypes: {
        // Wrapper for a modal page
        modal: React.PropTypes.bool
    },

    render: function() {
        var className = classNames('gb-page-wrapper', {
            'for-modal': this.props.modal
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageWrapper;
