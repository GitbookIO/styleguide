var React = require('react');

/**
 * Component to create overviews/intros with a title, description,
 * metas info (links), and a picture.
 */
var Overview = function (props) {
    return <div className="overview">{ this.props.children }</div>;
};

var Title = function (props) {
    return <h1 className="overview-title">{ this.props.children }</h1>;
};

var Description = function (props) {
    return <p className="overview-description">{ this.props.children }</p>;
};

var Meta = function (props) {
    return <div className="overview-meta">{ this.props.children }</div>;
};


module.exports = Overview;
module.exports.Title = Title;
module.exports.Description = Description;
module.exports.Meta = Meta;
