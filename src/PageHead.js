var React = require('react');

var SearchBar = require('./SearchBar');

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

var HeadSearchBar = React.createClass({
    // Same propTypes than SearchBar
    render: function() {
        return (
            <div className="hidden-xs hidden-sm pull-right">
                <SearchBar {...this.props}/>
            </div>
        );
    }
});

module.exports           = PageHead;
module.exports.Title     = HeadTitle;
module.exports.SearchBar = HeadSearchBar;
