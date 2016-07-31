var React = require('react');
var classNames = require('classnames');

var PageWrapper = React.createClass({
    propTypes: {
        withPageHead: React.PropTypes.bool,
        children: React.PropTypes.node
    },

    render: function() {
        var className = classNames('gb-page-wrapper', {
            'with-pagehead': this.props.withPageHead
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageWrapper;
