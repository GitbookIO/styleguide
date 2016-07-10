var React = require('react');
var classNames = require('classnames');

var Modal = React.createClass({
    getDefaultProps: function() {
        return {
            size: 'md'
        };
    },

    render: function() {
        var className = classNames('modal',
            'modal-' + this.props.size,
            this.props.className);

        return <div className={className}>
            {this.props.children}
        </div>;
    }
});

var ModalBody = React.createClass({
    render: function() {
        return <div className="modal-body">
            {this.props.children}
        </div>;
    }
});

var ModalFooter = React.createClass({
    render: function() {
        return <div className="modal-footer ">
            {this.props.children}
        </div>;
    }
});

var ModalHeading = React.createClass({
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

        return <div class="modal-heading">{this.props.children}</div>;
    }
});

module.exports         = Modal;
module.exports.Body    = ModalBody;
module.exports.Footer  = ModalFooter;
module.exports.Heading = ModalHeading;
