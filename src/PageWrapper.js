const React = require('react');
const classNames = require('classnames');

const PageWrapper = React.createClass({
    propTypes: {
        withPageHead: React.PropTypes.bool,
        children: React.PropTypes.node
    },

    render() {
        const className = classNames('gb-page-wrapper', {
            'with-pagehead': this.props.withPageHead
        });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = PageWrapper;
