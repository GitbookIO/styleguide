const React      = require('react');
const classNames = require('classnames');

const Button   = require('./Button');
const Icon     = require('./Icon');
const Backdrop = require('./Backdrop');
const warning  = require('./utils/warning');

/**
 * Dropdown (or up). Automatically bound to child Button.
 * See ButtonDropdown implementation to wrap something else than a button.
 *
 * <Dropdown>
 *
 *     <Button ... />
 *
 *     <Dropdown.Header>Category 1</Dropdown.Header>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *
 *     <Dropdown.Divider />
 *     <Dropdown.Header>Category 2</Dropdown.Header>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *     <Dropdown.Item href={...}> ... </Dropdown.Item>
 *
 * </Dropdown>
 */

const ButtonDropdown = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        children:  React.PropTypes.node,
        up:        React.PropTypes.bool,
        center:    React.PropTypes.bool,
        size:      React.PropTypes.string,
        scroll:    React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            scroll: false,
            up:     false,
            center: false
        };
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

        let { className, children, up, center, size, scroll, ...otherProps } = this.props;
        const { open } = this.state;

        className = classNames('dropdown', className, {
            'dropup': up,
            'dropcenter': center
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
            const acceptedChildren = [
                'DropdownItem',
                'DropdownDivider',
                'DropdownHeader'
            ];

            if (
                child &&
                child.type &&
                (acceptedChildren.includes(child.type.displayName))
            ) {
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
                <Backdrop wrapper={content} onClose={this.close} scroll={true}>
                    <DropdownMenu size={size} scroll={scroll}>{items}</DropdownMenu>
                </Backdrop>
            );
        } else {
            return content;
        }
    }
});

/**
 * An item in the dropdown.
 * @type {[type]}
 */
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

    onClick(event) {
        const { href, onClick } = this.props;

        if (href) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (onClick) {
            onClick();
        }
    },

    isInner(child) {
        return (!child || !child.type || child.type.displayName !== 'DropdownMenu');
    },

    render() {
        const { children, divider, disabled, header, checked, href } = this.props;

        if (divider) {
            warning('Prop "divider" on Dropdown.Item is deprecated, use Dropdown.Divider instead');
            return <DropdownDivider />;
        }
        if (header) {
            warning('Prop "header" on Dropdown.Item is deprecated, use Dropdown.Header instead');
            return <DropdownHeader>{children}</DropdownHeader>;
        }

        let inner = [], outer = [];

        inner = React.Children.map(children, function(child) {
            if (this.isInner(child)) return child;
            return null;
        }, this);

        outer = React.Children.map(children, function(child) {
            if (!this.isInner(child)) return child;
            return null;
        }, this);

        return (
            <li className={disabled ? 'disabled' : ''}>
                <a {...this.props} href={href || '#'} onClick={disabled ? null : this.onClick}>
                    {checked ? <div className="dropdown-icon pull-left"><Icon id="check" /></div> : ''}
                    {inner}
                </a>
                {outer}
            </li>
        );
    }
});

/**
 * A divider in the dropdown items.
 * @type {ReactClass}
 */
const DropdownDivider = React.createClass({
    render() {
        return (
            <li className="divider"></li>
        );
    }
});


/**
 * An header in the dropdown items
 * @type {ReactClass}
 */
const DropdownHeader = React.createClass({
    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        const { children } = this.props;
        return (
            <li className="dropdown-header">{children}</li>
        );
    }
});

/**
 * Container for the dropdown menu.
 * @type {ReactClass}
 */
const DropdownMenu = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        children:  React.PropTypes.node,
        size:      React.PropTypes.string,
        // Auto-scroll in the dropdown ?
        scroll:    React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            size: 'sm',
            scroll: true
        };
    },

    getInitialState() {
        return {
            maxHeight: null
        };
    },

    /**
     * Detect the max height for this dropdown according to position on screen.
     */
    detectMaxSize() {
        const { scroll } = this.props;
        const { container } = this.refs;

        if (!scroll) {
            return;
        }

        const rect = container.getBoundingClientRect();
        const maxHeight = window.innerHeight - rect.top - 30;

        this.setState({
            maxHeight
        });
    },

    componentDidMount() {
        this.detectMaxSize();
    },

    componentDidUpdate(prevProps) {
        const hasChanged = prevProps.children != this.props.children;

        if (hasChanged) {
            this.detectMaxSize();
        }
    },

    render() {
        const { children, size } = this.props;
        const { maxHeight } = this.state;
        const className = classNames('dropdown-menu', `dropdown-${size}`);

        return (
            <div ref="container" className={className}>
                <ul style={{ maxHeight }}>
                    {children}
                </ul>
            </div>
        );
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
module.exports.Divider     = DropdownDivider;
module.exports.Header      = DropdownHeader;
module.exports.Item        = DropdownItem;
module.exports.Item.Header = ItemHeader;
module.exports.Item.Desc   = ItemDesc;
module.exports.Menu        = DropdownMenu;
