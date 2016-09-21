const React = require('react');
const classNames = require('classnames');

const Icon = require('./Icon');

/**
 * Blankslate represent an emptycontent
 *
 * <Blankslate icon="book">
 *      <h3>No books</h3>
 *      <p>Create a book to get started</p>
 * </Blankslate>
 */


const Blankslate = React.createClass({
    propTypes: {
        icon:       React.PropTypes.string,
        background: React.PropTypes.bool,
        full:       React.PropTypes.bool,
        children: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            background: false,
            full:       true
        };
    },

    render() {
        let inner;
        const icon = this.props.icon;
        const className = classNames('blankslate', {
            'with-background': this.props.background,
            'full-width':      this.props.full
        });

        if (icon) {
            inner = (
                <BlankslateIcon>
                    <Icon id={icon} />
                </BlankslateIcon>
            );
        }

        return (
            <div className={className}>
                {inner}
                {this.props.children}
            </div>
        );
    }
});

const BlankslateIcon = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="icon">
                {this.props.children}
            </div>
        );
    }
});

/*
 * A full space layout with a blanksate
 */
const BlankslateLayout = React.createClass({
    propTypes: {
        background: React.PropTypes.bool,
        children:   React.PropTypes.node
    },

    render() {
        const { children, background } = this.props;
        const className = classNames('blankslate-layout', {
            'with-background': background
        });

        return (
            <div className={className}>
                {children}
            </div>
        );
    }
});

module.exports        = Blankslate;
module.exports.Layout = BlankslateLayout;
module.exports.Icon   = BlankslateIcon;
