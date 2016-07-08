var React = require('react');

var PageBody = React.createClass({
    render: function() {
        return (
            <div className="gb-page-body">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageBody;
