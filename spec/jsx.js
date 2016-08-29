const React = require('react');

const Message = React.createClass({
    render() {
        return (
            <input type="text" autoFocus={true} />
        );
    }
});

module.exports = Message;
