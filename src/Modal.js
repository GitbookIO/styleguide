var React = require('react');
var classNames = require('classnames');

var SIZES = require('./SIZES');

var Modal = React.createClass({
    propTypes: {
        size:     React.PropTypes.oneOf(SIZES),
        backdrop: React.PropTypes.bool,
        children: React.PropTypes.node,
        className: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            size: 'md',
            backdrop: true
        };
    },

    render: function() {
        var className = classNames('modal',
            'modal-' + this.props.size,
            this.props.className, {
                'without-backdrop': !this.props.backdrop
            });

        return <div className={className}>
            {this.props.children}
        </div>;
    }
});

var ModalBody = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return <div className="modal-body">
            {this.props.children}
        </div>;
    }
});

var ModalFooter = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render: function() {
        return <div className="modal-footer ">
            {this.props.children}
        </div>;
    }
});

var ModalHeading = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        onClose: React.PropTypes.func
    },

    onClose: function(e) {
        e.preventDefault();
        this.props.onClose();
    },

    render: function() {
        if (this.props.title) {
            return <div className="modal-heading">
                <h4>{this.props.title}</h4>
                {this.props.onClose? <a href="#" onClick={this.onClose} className="modal-close">&times;</a> : ''}
            </div>;
        }

        return <div className="modal-heading">{this.props.children}</div>;
    }
});

module.exports         = Modal;
module.exports.Body    = ModalBody;
module.exports.Footer  = ModalFooter;
module.exports.Heading = ModalHeading;
