const React = require('react');
const classNames = require('classnames');

const Icon = require('./Icon');

/**
 * Blankslate represent an emptycontent
 *
 * <Blankslate icon="book">
 *      <h3>No books</h3>
 *      <p>Create a book et get strated</p>
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
                <BlankSlateIcon>
                    <Icon id={icon} />
                </BlankSlateIcon>
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

const BlankSlateIcon = React.createClass({
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

module.exports      = Blankslate;
module.exports.Icon = BlankSlateIcon;
