var React = require('react');
var classNames = require('classnames');

var STYLES = require('./STYLES');

var Panel = React.createClass({
    propTypes: {
        style: React.PropTypes.oneOf(STYLES)
    },

    getDefaultProps: function() {
        return {
            style: STYLES[0]
        };
    },

    render: function() {
        var style = this.props.style;

        return (
            <div className={classNames('panel', 'panel-' + style)}>
                {this.props.children}
            </div>
        );
    }
});

var PanelHeading = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },

    render: function() {
        var title = this.props.title;
        var inner = '';

        if (title) {
            inner = <PanelTitle>{title}</PanelTitle>;
        }

        return (
            <div className="panel-heading">
                {inner}
                {this.props.children}
            </div>
        );
    }
});

var PanelTitle = React.createClass({
    render: function() {
        return (
            <h3 className="panel-title">
                {this.props.children}
            </h3>
        );
    }
});

var PanelBody = React.createClass({
    render: function() {
        return (
            <div className="panel-body">
                {this.props.children}
            </div>
        );
    }
});

var PanelFooter = React.createClass({
    render: function() {
        return (
            <div className="panel-footer">
                {this.props.children}
            </div>
        );
    }
});

module.exports         = Panel;
module.exports.Heading = PanelHeading;
module.exports.Title   = PanelTitle;
module.exports.Body    = PanelBody;
module.exports.Footer  = PanelFooter;
