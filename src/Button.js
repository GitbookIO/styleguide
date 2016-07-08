var React = require('react');
var classNames = require('classnames');

var Icon = require('./icon');

var Button = React.createClass({
    getDefaultProps: function() {
        return {
            style: 'default',
            size: 'md',
            filled: false,
            disabled: false,
            active: false
        };
    },

    onClick: function(e) {
        if (this.props.onClick) {
            this.props.onClick();
        }
    },

    render: function() {
        var props       = {};
        var title       = this.props.title;
        var inner       = this.props.icon? <Icon className={this.props.icon} /> : '';
        props.className = classNames('btn', 'btn-'+this.props.style, 'btn-'+this.props.size,
            this.props.className || [], {
                'btn-fill':        this.props.filled,
                'active':          this.props.active,
                'dropdown-toggle': this.props.dropdownToggle,
                'tooltipped':      Boolean(title)
            });
        props['aria-label'] = title;
        props.disabled      = this.props.disabled;
        props.onClick       = this.props.onNativeClick? this.props.onNativeClick : this.onClick;
        props.href          = this.props.href;
        props.id            = this.props.id;

        if (props.href) {
            return <a {...props}>{inner} {this.props.children}</a>;
        } else {
            return <button {...props}>{inner} {this.props.children}</button>;
        }
    }
});

var ButtonGroup = React.createClass({
    render: function() {
        var className = classNames(
            'btn-group',
            this.props.className,
            this.props.classes || [],
            this.props.pull? 'pull-'+this.props.pull : ''
        );

        return <div className={className}>{this.props.children}</div>;
    }
});

var ButtonToolbar = React.createClass({
    render: function() {
        return <div className={'btn-toolbar '+(this.props.className || '')}>{this.props.children}</div>;
    }
});

module.exports = Button;
module.exports.Group = ButtonGroup;
module.exports.Toolbar = ButtonToolbar;
