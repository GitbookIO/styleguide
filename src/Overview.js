const React = require('react');

/**
 * Component to create overviews/intros with a title, description,
 * metas info (links), and a picture.
 */
const Overview = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render () {
        return <div className="overview">{ this.props.children }</div>;
    }
});

Overview.Title = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render () {
        return <h1 className="overview-title">{ this.props.children }</h1>;
    }
});

Overview.Note = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render () {
        return <p className="overview-note">{ this.props.children }</p>;
    }
});

Overview.Description = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render () {
        return <p className="overview-description">{ this.props.children }</p>;
    }
});

Overview.Meta = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render () {
        return <div className="overview-meta">{ this.props.children }</div>;
    }
});

module.exports = Overview;
// Overview
// Overview.Title
// Overview.Description
// Overview.Meta
