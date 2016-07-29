var React = require('react');

var PageFooter = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <div className="gb-page-footer">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageFooter;
