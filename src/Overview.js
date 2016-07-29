var React = require('react');

/**
 * Component to create overviews/intros with a title, description,
 * metas info (links), and a picture.
 */
var Overview = React.createClass({
    render: function () {
        return <div className="overview">{ this.props.children }</div>;
    }
});

Overview.Title = React.createClass({
    render: function () {
        return <h1 className="overview-title">{ this.props.children }</h1>;
    }
});

Overview.Description = React.createClass({
    render: function () {
        return <p className="overview-description">{ this.props.children }</p>;
    }
});

Overview.Meta = React.createClass({
    render: function () {
        return <div className="overview-meta">{ this.props.children }</div>;
    }
});

module.exports = Overview;
// Overview
// Overview.Title
// Overview.Description
// Overview.Meta
