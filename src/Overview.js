var React = require('react');

var Row = require('./Row');
var Avatar = require('./Avatar');

/**
 * Component to create overviews/intros with a title, description,
 * metas info (links), and a picture.
 */
var Overview = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        description: React.PropTypes.element,
        avatarUrl: React.PropTypes.string,
        metas: React.PropTypes.arrayOf(React.PropTypes.element),
        extra: React.PropTypes.element // Extra info on the side
    },

    getDefaultProps: function () {
        return {
            title: '',
            description: '',
            avatarUrl: '',
            metas: [],
            extra: undefined
        };
    },

    // Determine the size of them main column
    getDescriptionCol: function () {
        var sizeAvatar = this.props.avatarUrl ? 2 : 0;
        var sizeExtra = this.props.extra ? 3 : 0;
        return 12 - sizeAvatar - sizeExtra;
    },

    renderMetas: function () {
        if (this.props.metas.length === 0) {
            return '';
        }

        var metas = this.props.metas.map(function (meta, i) {
            return <div key={i} className="overview-meta">
                {meta}
            </div>;
        });

        return <div class="overview-metas">
            { metas }
        </div>;
    },

    renderAvatar: function (avatarUrl) {
        if (!avatarUrl) {
            return '';
        } else {
            return <Row.Col md={2}>
                <Avatar src={avatarUrl}/>
            </Row.Col>;
        }
    },

    renderExtra: function (extra) {
        if (!extra) {
            return '';
        } else {
            return <Row.Col md={3}>
                { extra }
            </Row.Col>;
        }
    },

    render: function() {
        return (
            <div className="overview">
                <Row.Container>
                    <Row>
                        { this.renderAvatar(this.props.avatarUrl) }

                        <Row.Col md={ this.getDescriptionCol() }>
                            <div className="overview-description">
                                <h1>{ this.props.title }</h1>
                                <p className="description">{ this.props.description }</p>
                                { this.renderMetas() }
                            </div>
                        </Row.Col>

                        { this.renderExtra(this.props.extra) }
                    </Row>
                </Row.Container>
            </div>
        );
    }
});

module.exports = Overview;
