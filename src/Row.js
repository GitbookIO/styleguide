var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');

var Row = React.createClass({
    render: function() {
        return <div className="row">
            {this.props.children}
        </div>;
    }
});

var Container = React.createClass({
    render: function() {
        var className = classNames('container', {
            'container-fluid': this.props.fluid
        });

        return <div className={className}>
            {this.props.children}
        </div>;
    }
});

var Column = React.createClass({
    render: function() {
        var props = this.props;
        var className = SIZES.reduce(function(prev, size) {
            var prop = props[size];
            if (!prop) {
                return prev;
            }

            return (
                prev +
                ' col-' + size + '-' + prop
            );
        }, '');

        return <div className={className}>
            {this.props.children}
        </div>;
    }
});


module.exports           = Row;
module.exports.Container = Container;
module.exports.Col       = Column;
