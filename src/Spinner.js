const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');

const Spinner = React.createClass({
    propTypes: {
        centered: React.PropTypes.bool,
        inverse:  React.PropTypes.bool,
        size:     React.PropTypes.oneOf(SIZES)
    },

    getDefaultProps: function() {
        return {
            centered: true,
            size: 'md'
        };
    },

    render: function() {
        let className = classNames('gb-spinner', 'spinner-' + this.props.size, {
            'spinner-inverse':  this.props.inverse,
            'spinner-centered': this.props.centered
        });

        return <span className={className}></span>;
    }
});

/**
 * Block div representing a loading area
 */
const SpinnerSlate = React.createClass({
    render: function() {
        return <div className="gb-spinner-slate">
            <Spinner {...this.props} />
        </div>;
    }
});

module.exports = Spinner;
module.exports.Slate = SpinnerSlate;
