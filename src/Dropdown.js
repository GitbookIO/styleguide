var React = require('react');

var ButtonDropdown = React.createClass({
    getInitialState: function() {
        return {
            open: false
        };
    },

    // Toggle the dopdown
    toggle: function(e) {
        if (e) e.stopPropagation();

        this.setState({
            open: !this.state.open
        });
    },

    // Close the dropdown
    close: function() {
        this.setState({
            open: false
        });
    },

    bindWindowClick: function() {
        if (this.state.open) {
            window.addEventListener('click', this.close);
        } else {
            window.removeEventListener('click', this.close);
        }
    },

    componentDidUpdate: function() {
        this.bindWindowClick();
    },

    componentDidMount: function() {
        this.bindWindowClick();
    },

    componentWillUnmount: function() {
        window.removeEventListener('click', this.close);
    },

    render: function() {
        var that = this;
        var inner = [];
        var items = [];

        inner = React.Children.map(this.props.children, function(child) {
            // If the Button is connected through Redux.connect, it is
            // renamed to "Connect(Button...)"
            if (child.type && child.type.displayName.indexOf('Button') !== -1) {
                if (!child.props.onClick) {
                    return React.cloneElement(child, {
                        onNativeClick: that.toggle,
                        dropdownToggle: true
                    });
                }
                return child;
            }

            return null;
        });

        items = React.Children.map(this.props.children, function(child) {
            if (child.type && child.type.displayName == 'DropdownItem') {
                return React.cloneElement(child, {
                    onClick: function() {
                        if (child.props.onClick) child.props.onClick();
                        that.close();
                    }
                });
            }
            return null;
        });

        var classes = ['dropdown'];
        if (this.props.dropup) classes.push('dropup');

        return <ButtonGroup {...this.props} classes={classes}>
            {inner}
            <ul className={this.state.open? 'dropdown-menu open' : 'dropdown-menu'}>{items}</ul>
        </ButtonGroup>;
    }
});


var DropdownItem = React.createClass({
    onClick: function(e) {
        if (!this.props.href) {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.onClick) this.props.onClick();
        }
    },

    isInner: function(child) {
        return (child && (!child.type || child.type == 'i' || child.type == 'span' || child.type.displayName == 'ContextMenuShortcut'));
    },

    render: function() {
        if (this.props.divider) return <li className="divider"></li>;
        if (this.props.header) return <li className="dropdown-header">{this.props.children}</li>;

        var inner = [], outer = [];

        inner = React.Children.map(this.props.children, function(child) {
            if (this.isInner(child)) return child;
            return null;
        }, this);

        outer = React.Children.map(this.props.children, function(child) {
            if (!this.isInner(child)) return child;
            return null;
        }, this);

        return <li className={this.props.disabled? 'disabled' : ''}>
            <a href={this.props.href || '#'} onClick={this.props.disabled? null : this.onClick} target={this.props.href? '_blank' : ''}>{inner}</a>
            {outer}
        </li>;
    }
});

var DropdownMenu = React.createClass({
    render: function() {
        return <ul className="dropdown-menu">{this.props.children}</ul>;
    }
});

module.exports = ButtonDropdown;
module.exports.Item = DropdownItem;
module.exports.Menu = DropdownMenu;
