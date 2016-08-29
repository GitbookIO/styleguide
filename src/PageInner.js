const React = require('react');

const PageInner = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="gb-page-inner">
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageInner;
