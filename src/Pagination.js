const React = require('react');
const classNames = require('classnames');

const Pagination = React.createClass({
    propTypes: {
        // Index of current page
        page:           React.PropTypes.number.isRequired,

        // Total count of pages
        pages:          React.PropTypes.number.isRequired,

        // Minimum number of pages to list
        pagesToList:    React.PropTypes.number,

        // Callback when page changed (optional)
        onChange:       React.PropTypes.func,

        // Current uri
        getURL:         React.PropTypes.func
    },

    getDefaultProps() {
        return {
            getURL:      (page => '?page=' + page),
            pagesToList: 5
        };
    },

    /**
     * Clicked to select a page
     * @param  {Number} i
     */
    onSelectPage(i, e) {
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
    renderPageItem(i, text) {
        const page      = this.props.page;
        const isActive  = (i === page);
        const className = classNames({
            active: isActive
        });
        const uri = this.props.getURL(i);

        return (
            <li key={i} className={className}>
                <a href={uri} onClick={this.onSelectPage.bind(this, i)}>{text || (i + 1)}</a>
            </li>
        );
    },

    render() {
        let page          = this.props.page;
        const pages       = this.props.pages;
        const pagesToList = this.props.pagesToList;

        if (pages < 2) {
            return <div />;
        }

        const maxPage = pages - 1;
        if (page < 0) page = 0;
        if (page > maxPage) page = maxPage;

        // startRange, inclusive
        const startRange = Math.max(0, page - pagesToList);
        // endRange, inclusive
        const endRange   = Math.min(maxPage, page + pagesToList);
        // All the displayed page numbers
        const pagesRange = Array.from(Array(pages)).map(Number.call, Number).slice(startRange, endRange + 1);

        return (
            <div className="pagination">
                <ul className="pagination-pages">
                    {startRange === 0 ? '' : this.renderPageItem(0)}
                    {startRange === 0 ? '' : <li><span className="separator">...</span></li>}

                    {pagesRange.map(function(i) {
                        return this.renderPageItem(i);
                    }, this)}

                    {endRange === maxPage ? '' : <li><span className="separator">...</span></li>}
                    {endRange === maxPage ? '' : this.renderPageItem(maxPage)}
                </ul>
                <ul className="pagination-nav">
                    {page < 1 ? '' : this.renderPageItem(page - 1, '« previous page')}
                    {page >= (maxPage - 1) ? '' : this.renderPageItem(page + 1, 'next page »')}
                </ul>
            </div>
        );
    }
});

module.exports = Pagination;
