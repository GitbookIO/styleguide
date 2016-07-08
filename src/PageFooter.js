var React = require('react');

var PageFooter = React.createClass({
    render: function() {
        return (
            <div className="gb-page-footer">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageFooter;
