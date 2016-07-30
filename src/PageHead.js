var React = require('react');

var PageHead = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <div className="pagehead">
                {this.props.children}
            </div>
        );
    }
});

var HeadTitle = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <h1 className="head-heading">
                {this.props.children}
            </h1>
        );
    }
});

module.exports           = PageHead;
module.exports.Title     = HeadTitle;
