const React = require('react');
const classNames = require('classnames');
const Icon = require('./Icon');

/**
 * Component to create overviews/intros with a title, description,
 * metas info (links), and a picture.
 */
const Overview = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <div className="overview">{ this.props.children }</div>;
    }
});

Overview.Title = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <h1 className="overview-title">{ this.props.children }</h1>;
    }
});

Overview.StepTitle = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        primary:  React.PropTypes.bool,
        href:     React.PropTypes.string
    },

    render() {
        const { children, primary, href } = this.props;
        const className = classNames('overview-steptitle', {
            primary
        });

        if (href) {
            return <a href={href} className={className}>{children}</a>;
        }

        return <div className={className}>{children}</div>;
    }
});

Overview.StepDivider = React.createClass({
    render() {
        return (
            <div className="overview-stepdivider">
                <Icon id="chevron-right" />
            </div>
        );
    }
});

Overview.Note = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <p className="overview-note">{ this.props.children }</p>;
    }
});

Overview.Description = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <p className="overview-description">{ this.props.children }</p>;
    }
});

Overview.Meta = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <div className="overview-meta">{ this.props.children }</div>;
    }
});

module.exports = Overview;
