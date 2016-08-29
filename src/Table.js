const React      = require('react');
const classNames = require('classnames');

const Table = React.createClass({
    propTypes: {
        bordered: React.PropTypes.bool,
        className: React.PropTypes.string,
        children: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            bordered: false,
            className: ''
        };
    },

    render() {
        const className = classNames(
            'table',
            { 'table-bordered': this.props.bordered },
            this.props.className
        );

        return <table className={className}>
            {this.props.children}
        </table>;
    }
});

/**
 * ExpendableBody creates a <tbody> element displaying only `display` elements by default
 * If the number of elements is larger than the original `display` prop, a `Show More`
 * button is appended as the last row of the <tbody>. Clicking on it will display `step`
 * more elements each time, until every element is renderded.
 *
 * The elements to display are passed through the `data` prop as an array.
 * Each item of the array can either be:
 *     - a value: the default is to render a single cell with the value for this row
 *     - an array of values: the default is to render each value in a cell for this row
 *     - an object
 *
 * To render an object or customize the display of value(s), the `renderRow` prop accepts
 * a function to which is passed the current row item (value, array or object) and the row index.
 * It must return the corresponding row <tr key={index}> element.
 *
 * Finally, the `cols` prop is used to correctly display the `Show More` button in the table when
 * passing an array of objects to `data`.
 *
 * The `center` props allows for centering all values rendered by default.
 */

const ExpendableBody = React.createClass({
    propTypes: {
        data:      React.PropTypes.array.isRequired,
        display:   React.PropTypes.number,
        step:      React.PropTypes.number,
        cols:      React.PropTypes.string,
        renderRow: React.PropTypes.func,
        center:    React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            display:   5,
            step:      5,
            cols:      1,
            center:    false
        };
    },

    getInitialState() {
        return {
            limit: this.props.display
        };
    },

    isArray(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    },

    defaultRenderRow(item, i) {
        const className = classNames({
            'text-center': this.props.center
        });

        // Array of values per row
        if (this.isArray(item)) {
            return (
                <tr key={i}>
                    {item.map(function(value, j) {
                        return <td className={className} key={j}>{value}</td>;
                    })}
                </tr>
            );
        } else {
        // Single value
            return (
                <tr key={i}>
                    <td className={className}>{item}</td>
                </tr>
            );
        }
    },

    showMore() {
        const { step } = this.props;
        const { limit } = this.state;

        this.setState({
            limit: limit + step
        });
    },

    renderShowMore() {
        let { data, cols, step } = this.props;
        const { limit } = this.state;
        const length  = data.length;

        // Don't display when everything's on the screen
        if (limit >= length) {
            return null;
        }

        // Try to get colSpan from data if array
        if (Boolean(length) && this.isArray(data[0])) {
            cols = data[0].length.toString();
        }

        return (
            <tr>
                <td className="text-center" colSpan={cols}>
                    <div className="show-more" onClick={this.showMore}>
                        Show {step} more ({length - limit})
                    </div>
                </td>
            </tr>
        );
    },

    renderRow(item, i) {
        const renderRow = this.props.renderRow || this.defaultRenderRow;
        return renderRow(item, i);
    },

    render() {
        const { data }   = this.props;
        const { limit } = this.state;

        return (
            <tbody className="table-body-expendable">
            {data.slice(0, limit).map(this.renderRow, this)}
            {this.renderShowMore()}
            </tbody>
        );
    }
});

module.exports = Table;
module.exports.ExpendableBody = ExpendableBody;
