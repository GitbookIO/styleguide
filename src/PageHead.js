const React = require('react');

const PageHead = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="pagehead">
                {this.props.children}
            </div>
        );
    }
});

const HeadTitle = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <h1 className="head-heading">
                {this.props.children}
            </h1>
        );
    }
});

module.exports           = PageHead;
module.exports.Title     = HeadTitle;
