const React      = require('react');
const classNames = require('classnames');

const Button   = require('./Button');
const Icon     = require('./Icon');
const Backdrop = require('./Backdrop');

/**
 * Dropdown (or up). Automatically bound to child Button.
 * See ButtonDropdown implementation to wrap something else than a button.
 *
 * <Dropdown>
 *
 *     <Button ... />
 *
 *     <Dropdown.Item header>Category 1</Dropdown.Item>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *
 *     <Dropdown.Item divider />
 *     <Dropdown.Item header>Category 2</Dropdown.Item>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *
 *     <Dropdown.Item>
 *         A submenu
 *         <Dropdown.Menu open={false}> // CSS takes care of display on hover
 *             <Dropdown.Item href={...}> Subitem </Dropdown.Item>
 *         </Dropdown.Menu>
 *     </Dropdown.Item>
 *
 * </Dropdown>
 */

const ButtonDropdown = React.createClass({
    propTypes: {
        className:  React.PropTypes.string,
        children: React.PropTypes.node,
        up:    React.PropTypes.bool,
        width: React.PropTypes.string
    },

    getInitialState() {
        return {
            open: false
        };
    },

    /**
     * Toggle the dopdown
     * @param  {Event} e?
     */
    toggle(e) {
        if (e) {
            e.stopPropagation();
        }

        this.setState({
            open: !this.state.open
        });
    },

    /**
     * Close the dropdown
     */
    close() {
        this.setState({
            open: false
        });
    },

    render() {
        const that = this;
        let inner = [];
        let items = [];

        let { className, children, up, width, ...otherProps } = this.props;
        const { open } = this.state;

        className = classNames('dropdown', className, {
            'dropup': up
        });

        inner = React.Children.map(children, function(child) {
            // If the Button is connected through Redux.connect, it is
            // renamed to "Connect(Button...)"
            if (
                child &&
                child.type &&
                child.type.displayName &&
                child.type.displayName.indexOf('Button') !== -1
            ) {
                if (!child.props.onClick && !child.props.href) {
                    return React.cloneElement(child, {
                        onClick: that.toggle,
                        dropdownToggle: true
                    });
                }
                return child;
            }

            return null;
        });

        items = React.Children.map(children, function(child) {
            if (child && child.type && child.type.displayName == 'DropdownItem') {
                return React.cloneElement(child, {
                    onClick() {
                        if (child.props.onClick) {
                            child.props.onClick();
                        }
                        that.close();
                    }
                });
            }
            return null;
        });

        const content = (
            <Button.Group {...otherProps} className={className}>
                {inner}
            </Button.Group>
        );

        // Wrap in a backdrop when open
        if (open) {
            return (
                <Backdrop wrapper={content} onClose={this.close}>
                    {open ? <DropdownMenu width={width} >{items}</DropdownMenu> : null}
                </Backdrop>
            );
        } else {
            return content;
        }
    }
});

const DropdownItem = React.createClass({
    propTypes: {
        children:  React.PropTypes.node,
        onClick:   React.PropTypes.func,
        href:      React.PropTypes.string,
        disabled:  React.PropTypes.bool,
        divider:   React.PropTypes.bool,
        header:    React.PropTypes.bool,
        checked:   React.PropTypes.bool
    },

    onClick(e) {
        if (!this.props.href) {
            e.preventDefault();
            e.stopPropagation();

            if (this.props.onClick) this.props.onClick();
        }
    },

    isInner(child) {
        return (!child || !child.type || child.type.displayName !== 'DropdownMenu');
    },

    render() {
        const { divider, header, checked } = this.props;

        if (divider) {
            return <li className="divider"></li>;
        }
        if (header) {
            return <li className="dropdown-header">{this.props.children}</li>;
        }

        let inner = [], outer = [];

        inner = React.Children.map(this.props.children, function(child) {
            if (this.isInner(child)) return child;
            return null;
        }, this);

        outer = React.Children.map(this.props.children, function(child) {
            if (!this.isInner(child)) return child;
            return null;
        }, this);

        return <li className={this.props.disabled ? 'disabled' : ''}>
            <a {...this.props} href={this.props.href || '#'} onClick={this.props.disabled ? null : this.onClick}>
                {checked ? <div className="dropdown-icon pull-left"><Icon id="check" /></div> : ''}
                {inner}
            </a>
            {outer}
        </li>;
    }
});

const DropdownMenu = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        children:  React.PropTypes.node,
        open:      React.PropTypes.bool,
        width:     React.PropTypes.string
    },

    getDefaultProps() {
        return {
            open:  true,
            width: null
        };
    },

    render() {
        const { width } = this.props;
        const className = classNames('dropdown-menu', width ? 'dropdown-' + width : '',
            {
                open: this.props.open
            }
        );

        return <ul className={className}>
            {this.props.children}
        </ul>;
    }
});

const ItemHeader = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <div className="dropdown-itemheader">
            {this.props.children}
        </div>;
    }
});

const ItemDesc = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        return <div className="dropdown-itemdesc">
            {this.props.children}
        </div>;
    }
});

module.exports             = ButtonDropdown;
module.exports.Item        = DropdownItem;
module.exports.Item.Header = ItemHeader;
module.exports.Item.Desc   = ItemDesc;
module.exports.Menu        = DropdownMenu;
