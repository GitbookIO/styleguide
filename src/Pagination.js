var React = require('react');
var classNames = require('classnames');

var Pagination = React.createClass({
    propTypes: {
        // Index of current page
        page:           React.PropTypes.number.isRequired,

        // Total count of pages
        pages:          React.PropTypes.number.isRequired,

        // Minimum number of pages to list
        pagesToList:    React.PropTypes.number,

        // Callback when pae changed (optional)
        onChange:       React.PropTypes.func,

        // Current uri
        getURL:         React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            getURL:      function() { return '#'; },
            pagesToList: 5
        };
    },

    /**
     * Clicked to select a page
     * @param  {Number} i
     */
    onSelectPage: function(i, e) {
        if (this.props.onChange) {
            e.preventDefault();
            return this.props.onChange(i);
        }
    },

    /**
     * Render a page selector
     * @param {Number} i
     * @param {String} text
     * @return {React.Element}
     */
    renderPageItem: function(i, text) {
        var page      = this.props.page;
        var isActive  = (i === page);
        var className = classNames({
            active: isActive
        });
        var uri = this.props.getURL(i);

        return <li key={i} className={className}>
            <a href={uri} onClick={this.onSelectPage.bind(this, i)}>{text || i}</a>
        </li>;
    },

    render: function() {
        var page        = this.props.page;
        var pages       = this.props.pages;
        var pagesToList = this.props.pagesToList;

        var startRange = Math.max(0, page - pagesToList);
        var maxRange   = pages - 1;
        var endRange   = Math.min(maxRange, page + pagesToList);
        var pagesRange = Array.apply(null, {length: pages}).map(Number.call, Number).slice(startRange, endRange);

        return (
            <div className="pagination">
                <ul className="pagination-pages">
                    {startRange === 0? '' : this.renderPageItem(0)}
                    {startRange === 0? '' : <li><span className="separator">...</span></li>}

                    {pagesRange.map(function(i) {
                        return this.renderPageItem(i);
                    }, this)}

                    {endRange === maxRange? '' : <li><span className="separator">...</span></li>}
                    {endRange === maxRange? '' : this.renderPageItem(maxRange)}
                </ul>
                <ul className="pagination-nav">
                    {page < 1? '' : this.renderPageItem(page - 1, '« previous page')}
                    {page >= maxRange? '' : this.renderPageItem(page + 1, 'next page »')}
                </ul>
            </div>
        );
    }
});

module.exports = Pagination;
