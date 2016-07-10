var React = require('react');

var PageInner = React.createClass({
    render: function() {
        return (
            <div className="gb-page-inner">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageInner;
