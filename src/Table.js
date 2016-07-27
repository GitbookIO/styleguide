var React      = require('react');
var classNames = require('classnames');

var Table = React.createClass({
    propTypes: {
        bordered: React.PropTypes.bool,
        className: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            bordered: false,
            className: ''
        };
    },

    render: function() {
        var className = classNames(
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

var ExpendableBody = React.createClass({
    propTypes: {
        data:      React.PropTypes.array.isRequired,
        display:   React.PropTypes.number,
        step:      React.PropTypes.number,
        cols:      React.PropTypes.string,
        renderRow: React.PropTypes.func,
        center:    React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            display:   5,
            step:      5,
            cols:      1,
            center:    false
        };
    },

    getInitialState: function() {
        return {
            limit: this.props.display
        };
    },

    isArray: function(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    },

    defaultRenderRow: function(item, i) {
        var className = classNames({
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

    showMore: function() {
        var step         = this.props.step;
        var currentLimit = this.state.limit;

        this.setState({
            limit: currentLimit + step
        });
    },

    renderShowMore: function() {
        var data    = this.props.data;
        var colSpan = this.props.cols;
        var step    = this.props.step;
        var limit   = this.state.limit;
        var length  = data.length;

        // Don't display when everything's on the screen
        if (limit >= length) {
            return null;
        }

        // Try to get colSpan from data if array
        if (Boolean(length) && this.isArray(data[0])) {
            colSpan = data[0].length.toString();
        }

        return (
            <tr>
                <td className="text-center" colSpan={colSpan}>
                    <div className="show-more" onClick={this.showMore}>
                        Show {step} more ({length - limit})
                    </div>
                </td>
            </tr>
        );
    },

    renderRow: function(item, i) {
        var renderRow = this.props.renderRow || this.defaultRenderRow;
        return renderRow(item, i);
    },

    render: function() {
        var data  = this.props.data;
        var limit = this.state.limit;

        return (
            <tbody className="table-body-expendable">
            {data.slice(0, limit).map(this.renderRow, this)}
            {this.renderShowMore()}
            </tbody>
        );
    }
})

module.exports = Table;
module.exports.ExpendableBody = ExpendableBody;
