var React = require('react');

var PageBody = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <div className="gb-page-body">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageBody;
