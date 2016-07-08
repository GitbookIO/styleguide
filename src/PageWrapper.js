var React = require('react');

var PageWrapper = React.createClass({
    render: function() {
        return (
            <div className="gb-page-wrapper">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageWrapper;
