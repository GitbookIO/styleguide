var React = require('react');
var classNames = require('classnames');
var SIZES = require('./SIZES');

var Row = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <div className="row">
            {this.props.children}
        </div>;
    }
});

var Container = require('./Container');

var Column = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        // oneOf(SIZES): React.PropTypes.number,
        offset:   React.PropTypes.number
    },

    render() {
        var { offset, children } = this.props;

        var className = classNames(SIZES.reduce((list, size) => {
            var col = this.props[size];

            if (col) {
                list.push(['col', size, col].join('-'));
            }
            if (col && offset) {
                list.push(['col', size, 'offset', offset].join('-'));
            }

            return list;
        }, []));

        return <div className={className}>
            { children }
        </div>;
    }
});


module.exports           = Row;
module.exports.Container = Container;
module.exports.Col       = Column;
