var React = require('react');
var classNames = require('classnames');

var Icon = require('./Icon');

var Blankslate = React.createClass({
    propTypes: {
        icon:       React.PropTypes.string,
        background: React.PropTypes.bool,
        full:       React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            background: false,
            full:       true
        };
    },

    render: function() {
        var inner;
        var icon = this.props.icon;
        var className = classNames('blankslate', {
            'with-background': this.props.background,
            'full-width':      this.props.full
        });

        if (icon) {
            inner = (
                <div className="icon">
                    <Icon id={icon} />
                </div>
            );
        }

        return (
            <div className={className}>
                {inner}
                {this.props.children}
            </div>
        );
    }
});

module.exports = Blankslate;
