const React = require('react');
const classNames = require('classnames');

const STYLES = require('./STYLES');

const Panel = React.createClass({
    propTypes: {
        style: React.PropTypes.oneOf(STYLES),
        children: React.PropTypes.node
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

const PanelHeading = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        children: React.PropTypes.node
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

const PanelTitle = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <h3 className="panel-title">
                {this.props.children}
            </h3>
        );
    }
});

const PanelToolbar = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <div className="panel-toolbar">
                {this.props.children}
            </div>
        );
    }
});

const PanelBody = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return (
            <div className="panel-body">
                {this.props.children}
            </div>
        );
    }
});

const PanelFooter = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

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
module.exports.Toolbar = PanelToolbar;
