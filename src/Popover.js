var React = require('react');
var classNames = require('classnames');

const POSITIONS = ['bottom', 'top'];

var Popover =  React.createClass({
    propTypes: {
        position: React.PropTypes.oneOf(POSITIONS)
    },

    getDefaultProps: function() {
        return {
            position: POSITIONS[0]
        };
    },

    render: function() {
        var position  = this.props.position;
        var className = classNames('popover', 'popover-' + position);

        return (
            <div className={className}>
                <div className="popover-arrow"></div>
                {this.props.children}
            </div>
        );
    }
});

var PopoverContainer =  React.createClass({
    render: function() {
        return (
            <div className="popover-container">
                {this.props.children}
            </div>
        );
    }
});

var PopoverBody =  React.createClass({
    render: function() {
        return (
            <div className="popover-body">
                {this.props.children}
            </div>
        );
    }
});

var PopoverHeading =  React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },

    render: function() {
        if (this.props.title) {
            return (
                <div className="popover-heading">
                    <h4>{this.props.title}</h4>
                </div>
            );
        }

        return (
            <div className="popover-header">
                {this.props.children}
            </div>
        );
    }
});

module.exports           = Popover;
module.exports.Body      = PopoverBody;
module.exports.Heading   = PopoverHeading;
module.exports.Container = PopoverContainer;
