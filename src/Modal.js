const React = require('react');
const classNames = require('classnames');

const SIZES = require('./SIZES');

const Modal = React.createClass({
    propTypes: {
        size:     React.PropTypes.oneOf(SIZES),
        backdrop: React.PropTypes.bool,
        children: React.PropTypes.node,
        className: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            size: 'md',
            backdrop: true
        };
    },

    render() {
        let className = classNames('modal',
            'modal-' + this.props.size,
            this.props.className, {
                'without-backdrop': !this.props.backdrop
            });

        return (
            <div className={className}>
                {this.props.children}
            </div>
        );
    }
});

const ModalBackdrop = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="modal-backdrop ">
                {this.props.children}
            </div>
        );
    }
});

const ModalBody = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
});

const ModalFooter = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return (
            <div className="modal-footer ">
                {this.props.children}
            </div>
        );
    }
});

const ModalHeading = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        onClose:  React.PropTypes.func,
        title:    React.PropTypes.string
    },

    onClose(e) {
        e.preventDefault();
        this.props.onClose();
    },

    render() {
        if (this.props.title) {
            return (
                <div className="modal-heading">
                    <h4>{this.props.title}</h4>
                    {this.props.onClose? <a href="#" onClick={this.onClose} className="modal-close">&times;</a> : ''}
                </div>
            );
        }

        return (
            <div className="modal-heading">
                {this.props.children}
            </div>
        );
    }
});

module.exports          = Modal;
module.exports.Backdrop = ModalBackdrop;
module.exports.Body     = ModalBody;
module.exports.Footer   = ModalFooter;
module.exports.Heading  = ModalHeading;
