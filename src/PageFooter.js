const React = require('react');

const PageFooter = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="gb-page-footer">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageFooter;
