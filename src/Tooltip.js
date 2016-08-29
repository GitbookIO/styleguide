var React = require('react');
var classNames = require('classnames');

var POSITIONS = {
    BOTTOM_RIGHT: 'e',
    BOTTOM_LEFT:  'w',
    TOP_LEFT:     'nw',
    TOP_RIGHT:    'ne',
    BOTTOM:       '',
    TOP:          'n'
};

var Tooltip = React.createClass({
    propTypes: {
        title:    React.PropTypes.string.isRequired,
        position: React.PropTypes.string,
        open:     React.PropTypes.bool,
        children: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            open:     false,
            position: POSITIONS.BOTTOM
        };
    },

    render() {
        var className = classNames(
            'tooltipped-overlay',
            'tooltipped-' + this.props.position,
            'tooltipped',
            {
                'tooltipped-o': this.props.open
            }
        );

        return (
            <div className={className} aria-label={this.props.title}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Tooltip;
module.exports.POSITIONS = POSITIONS;
