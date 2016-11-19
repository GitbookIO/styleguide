const React = require('react');
const classNames = require('classnames');
const SIZES = require('./SIZES');

const Row = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <div className="row">
            {this.props.children}
        </div>;
    }
});

const Container = require('./Container');

const Column = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        const { children } = this.props;

        const className = classNames(SIZES.reduce((list, size) => {
            const col = this.props[size];
            const offset = this.props[`${size}Offset`];

            if (col) {
                list.push(['col', size, col].join('-'));
            }
            if (offset) {
                list.push(['col', size, 'offset', offset].join('-'));
            }

            return list;
        }, []));

        return (
            <div className={className}>
                { children }
            </div>
        );
    }
});


module.exports           = Row;
module.exports.Container = Container;
module.exports.Col       = Column;
