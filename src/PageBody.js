const React = require('react');

const PageBody = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="gb-page-body">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageBody;
