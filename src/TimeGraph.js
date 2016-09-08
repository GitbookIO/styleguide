const React  = require('react');
const moment = require('moment');

const DateSpan = require('./Date');

const TimeLine = React.createClass({
    propTypes: {
        currentX:   React.PropTypes.number,
        lineTop:    React.PropTypes.number,
        lineBottom: React.PropTypes.number,
        lastX:      React.PropTypes.number,
        lastPoints: React.PropTypes.array,
        points:     React.PropTypes.array,
        setHovered: React.PropTypes.func
    },

    contextTypes: {
        pointRadius: React.PropTypes.number,
        lineWidth:   React.PropTypes.number,
        axeColor:    React.PropTypes.string
    },

    getInitialState() {
        return {
            hovered: false
        };
    },

    setHovered(state, params) {
        // Send global state hovered parameters
        if (!state) {
            params = null;
        }

        this.props.setHovered(params);

        this.setState({
            hovered: state
        });
    },

    renderPathLine(index) {
        const lastX = this.props.lastX;
        if (!Boolean(lastX)) {
            return null;
        }

        const { currentX } = this.props;
        const currentPoint = this.props.points[index];
        const lastPoint    = this.props.lastPoints[index];

        return <line x1={lastX} y1={lastPoint.y} x2={currentX} y2={currentPoint.y}
            stroke={currentPoint.color} strokeWidth={this.context.lineWidth} />;
    },

    render() {
        const { hovered } = this.state;
        const {
            currentX,
            lineTop,
            lineBottom,
            points
        } = this.props;

        // Increase points radius if hovered
        let pointRadius = this.context.pointRadius;
        if (hovered) {
            pointRadius += 2;
        }

        const hoveredParams = {
            x: currentX,
            points
        };

        return (
            <g>
                <line x1={currentX} x2={currentX} y1={lineTop} y2={lineBottom}
                    stroke={this.context.axeColor} strokeWidth={this.context.lineWidth} />

                {points.map((point, index) => {
                    const color = point.color;
                    // Default serie name to index
                    const dataSerie  = point.serie || index;

                    return (
                        <g key={index}>
                            {this.renderPathLine(index)}
                            <circle key={index}
                                onMouseEnter={this.setHovered.bind(this, true, hoveredParams)}
                                onMouseLeave={this.setHovered.bind(this, false)}
                                className={'serie-point' + (hovered ? ' hovered' : '')}
                                r={pointRadius}
                                fill={color}
                                strokeWidth={this.context.lineWidth * 2}
                                stroke="#FFFFFF"
                                cx={currentX}
                                cy={point.y}
                                data-value={point.value}
                                data-timestamp={Number(point.date)}
                                data-serie={dataSerie} />
                            }
                        </g>
                    );
                })}
            </g>
        );
    }
});

const Body = React.createClass({
    propTypes: {
        dateMin:    React.PropTypes.number,
        dateMax:    React.PropTypes.number,
        valueMin:   React.PropTypes.number,
        valueMax:   React.PropTypes.number,
        width:      React.PropTypes.number,
        height:     React.PropTypes.number,
        innerX:     React.PropTypes.number,
        innerY:     React.PropTypes.number,
        yBase:      React.PropTypes.number,
        series:     React.PropTypes.array,
        setHovered: React.PropTypes.func
    },

    contextTypes: {
        seriesStyle:  React.PropTypes.array,
        pointRadius:  React.PropTypes.number,
        defaultColor: React.PropTypes.string,
        lineWidth:    React.PropTypes.number,
        axeColor:     React.PropTypes.string
    },

    // Compute X for a point inside Body
    innerPositionX(pX) {
        return this.props.innerX + pX * this.props.width;
    },

    // Compute Y for a point inside Body
    innerPositionY(pY) {
        return this.props.yBase + (this.props.height * (1 - pY));
    },

    // Return inner X value for a date
    getInnerX(date) {
        return this.innerPositionX((date - this.props.dateMin) / (this.props.dateMax - this.props.dateMin));
    },

    // Return inner Y value for a value
    getInnerY(value) {
        return this.innerPositionY((value - this.props.valueMin) / (this.props.valueMax - this.props.valueMin));
    },

    // Return correct mapping for a point to draw in TimeLine
    formatPoint(time, point, index) {
        const seriesStyle = this.context.seriesStyle;
        const serieStyle = seriesStyle[index];

        return {
            color: point.color || (serieStyle ? serieStyle.color : null) || this.context.defaultColor,
            value: point.value,
            serie: point.serie || (serieStyle ? serieStyle.title : index),
            date:  time.date,
            y:     this.getInnerY(point.value)
        };
    },

    // Draw this time line
    drawTimeLine(time, i, series) {
        // Current time informations
        const currentX   = this.getInnerX(time.date);
        const lineTop    = this.props.yBase;
        const lineBottom = this.props.yBase + this.props.height;

        const points = time.points.map(this.formatPoint.bind(this, time));

        // Last time informations
        let lastX      = null;
        let lastPoints = null;
        const lastTime = series[i - 1];

        if (Boolean(lastTime)) {
            lastX      = this.getInnerX(lastTime.date);
            lastPoints = lastTime.points.map(this.formatPoint.bind(this, lastTime));
        }

        return (
            <TimeLine key={i}
                currentX={currentX}
                lineTop={lineTop}
                lineBottom={lineBottom}
                points={points}
                lastX={lastX}
                lastPoints={lastPoints}
                setHovered={this.props.setHovered} />
        );
    },

    render() {
        const { series } = this.props;

        return (
            <g>
            {series.map(this.drawTimeLine, this)}
            </g>
        );
    }
});

const XAxis = React.createClass({
    propTypes: {
        length:  React.PropTypes.number,
        dateMin: React.PropTypes.number,
        dateMax: React.PropTypes.number,
        innerX:  React.PropTypes.number,
        yTop:    React.PropTypes.number
    },

    contextTypes: {
        textColor:      React.PropTypes.string,
        textFontSize:   React.PropTypes.number,
        textFontFamily: React.PropTypes.string
    },

    getValuePerInterval() {
        const dateMin = this.props.dateMin;
        const dateMax = this.props.dateMax;

        // Get optimal interval for X axis
        return [
            {
                format: 'SSSS',
                interval: 1
            },
            {
                format: 'SSSS',
                interval: 10
            },
            {
                format: 'SSSS',
                interval: 100
            },
            {
                format: 'H:mm:ss',
                interval: 1 * 1000
            },
            {
                format: 'H:mm',
                interval: 60 * 1000
            },
            {
                format: 'H',
                interval: 60 * 60 * 1000
            },
            {
                format: 'DD/MM',
                interval: 1 * 24 * 60 * 60 * 1000
            },
            {
                format: 'DD/MM',
                interval: 7 * 24 * 60 * 60 * 1000
            },
            {
                format: 'DD/MM',
                interval: 30 * 24 * 60 * 60 * 1000
            },
            {
                format: 'YYYY',
                interval: 365 * 24 * 60 * 60 * 1000
            },
            {
                format: 'YYYY',
                interval: 10 * 365 * 24 * 60 * 60 * 1000
            },
            {
                format: 'YYYY',
                interval: 100 * 365 * 24 * 60 * 60 * 1000
            }
        ].filter((interval) => {
            const count = (dateMax - dateMin) / interval.interval;
            return count > 1;
        })
        .map((interval) => {
            const count = (dateMax - dateMin) / interval.interval;
            return { count, interval };
        })
        .sort((a, b) => a.count > b.count)[0].interval;
    },

    render() {
        const {
            dateMin,
            dateMax,
            length,
            innerX,
            yTop
        } = this.props;

        // Compute intervals for rendering dates
        const valuePerInterval = this.getValuePerInterval();
        const wPerMS           = length / (dateMax - dateMin);
        const axeXInterval     = ((dateMax - dateMin) * wPerMS) / (this.context.textFontSize * 10);

        // Construct range of intervals
        const intervalRange = [];
        for (let i = 0; i < axeXInterval; i++) {
            intervalRange.push(i);
        }

        return (
            <g>
            {intervalRange.map((i) => {
                const value = i * valuePerInterval.interval;
                const date  = new Date(dateMin + value);

                const x = innerX + (value * wPerMS);
                // Don't draw point if too far
                if (x > innerX + length) {
                    return null;
                }

                return <text key={i} x={x} y={yTop}
                    fontFamily={this.context.textFontFamily} fontSize={this.context.textFontSize}
                    fill={this.context.textColor} textAnchor="middle">{moment(date).format(valuePerInterval.format)}</text>;
            })}
            </g>
        );
    }
});

const YAxis = React.createClass({
    propTypes: {
        length:       React.PropTypes.number,
        valueMin:     React.PropTypes.number,
        valueMax:     React.PropTypes.number,
        innerX:       React.PropTypes.number,
        innerY:       React.PropTypes.number,
        yBase:        React.PropTypes.number,
        axeYInterval: React.PropTypes.number
    },

    // Computes the optimal tick step for the Y axis
    // We assume: range = Math.abs(upper - lower)
    // i.e: range should not be negative
    optimalTickStep(maxTicks) {
        const valueMin = this.props.valueMin;
        const valueMax = this.props.valueMax;

        const range     = valueMax - valueMin;
        const minimum   = range / maxTicks;
        const magnitude = Math.pow(10, Math.floor(Math.log(minimum) / Math.log(10)));
        const residual  = minimum / magnitude;

        // Tick is an amplified magnitude
        // depending on the residual
        if (residual > 5) {
            return 10 * magnitude;
        } else if (residual > 2) {
            return 5 * magnitude;
        } else if (residual > 1) {
            return 2 * magnitude;
        }
        return magnitude;
    },

    contextTypes: {
        lineWidth:      React.PropTypes.number,
        axeColor:       React.PropTypes.string,
        axeMarkerWidth: React.PropTypes.number,
        textColor:      React.PropTypes.string,
        textFontSize:   React.PropTypes.number,
        textFontFamily: React.PropTypes.string
    },

    render() {
        const {
            valueMin,
            valueMax,
            length,
            innerX,
            innerY,
            yBase
        } = this.props;
        let { axeYInterval } = this.props;

        const hPerValue    = length / (valueMax - valueMin);
        axeYInterval = ((valueMax - valueMin) * hPerValue) / (this.context.textFontSize * 4);

        // Calcul perfect value per interval (1, 10, 100, 1000, ...)
        const valuePerInterval = this.optimalTickStep(axeYInterval);
        // Construct range of intervals
        const intervalRange = [];
        for (let i = 0; i < axeYInterval + 1; i++) {
            intervalRange.push(i);
        }

        return (
            <g>
                {intervalRange.map((i) => {
                    const value        = i * valuePerInterval;
                    const y            = innerY - (value * hPerValue);
                    const displayValue = value + valueMin;

                    // Don't draw point if is too high
                    if (y < yBase) {
                        return null;
                    }

                    const textX  = innerX - (2 * this.context.axeMarkerWidth);
                    const lineX1 = innerX - this.context.axeMarkerWidth;
                    const lineX2 = innerX;

                    return (
                        <g key={i}>
                            <text x={textX} y={y}
                                fontFamily={this.context.textFontFamily} fontSize={this.context.textFontSize}
                                textAnchor="end" fill={this.context.textColor}>{displayValue}</text>
                            <line x1={lineX1} x2={lineX2} y1={y} y2={y}
                                stroke={this.context.axeColor} strokeWidth={this.context.lineWidth} />
                        </g>
                    );
                })}
            </g>
        );
    }
});

const TimeGraph = React.createClass({
    propTypes: {
        // Series
        series:      React.PropTypes.array.isRequired,
        seriesStyle: React.PropTypes.array,
        minValue:    React.PropTypes.number,

        // Autofill
        autoFill:          React.PropTypes.bool,
        autoFillValue:     React.PropTypes.number,
        autoFillStartTime: React.PropTypes.number,
        autoFillEndTime:   React.PropTypes.number,

        // Size
        width:   React.PropTypes.number,
        height:  React.PropTypes.number,
        padding: React.PropTypes.number,

        // Styling
        pointRadius:  React.PropTypes.number,
        lineWidth:    React.PropTypes.number,
        defaultColor: React.PropTypes.string,

        axeColor:       React.PropTypes.string,
        axeMarkerWidth: React.PropTypes.number,

        textColor:      React.PropTypes.string,
        textFontSize:   React.PropTypes.number,
        textFontFamily: React.PropTypes.string
    },

    childContextTypes: {
        seriesStyle:  React.PropTypes.array,
        pointRadius:  React.PropTypes.number,
        defaultColor: React.PropTypes.string,
        lineWidth:    React.PropTypes.number,

        axeColor:       React.PropTypes.string,
        axeMarkerWidth: React.PropTypes.number,

        textColor:      React.PropTypes.string,
        textFontSize:   React.PropTypes.number,
        textFontFamily: React.PropTypes.string
    },

    getDefaultProps() {
        return {
            // Autofill
            autoFill:          false,
            autoFillValue:     0,
            autoFillInterval:  1000 * 60 * 60 * 24,
            autoFillStartTime: null,
            autoFillEndTime:   null,

            // Size
            width:   800,
            height:  400,
            padding: 20,

             // Styling
            pointRadius:  4,
            lineWidth:    1,
            defaultColor: '#1db34f',

            axeColor:        '#eee',
            axeMarkerWidth:  10,

            textColor:      '#aaa',
            textFontSize:   10,
            textFontFamily: 'helvetica'
        };
    },

    getChildContext() {
        return {
            seriesStyle:    this.props.seriesStyle,
            pointRadius:    this.props.pointRadius,
            defaultColor:   this.props.defaultColor,
            lineWidth:      this.props.lineWidth,
            axeColor:       this.props.axeColor,
            axeMarkerWidth: this.props.axeMarkerWidth,
            textColor:      this.props.textColor,
            textFontSize:   this.props.textFontSize,
            textFontFamily: this.props.textFontFamily
        };
    },

    getInitialState() {
        return this.getStateFromProps(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    },

    getStateFromProps(props) {
        const width        = props.width;
        const height       = props.height;
        const padding      = props.padding;
        const minValue     = props.minValue;
        const defaultColor = props.defaultColor;
        const seriesStyle  = props.seriesStyle;
        let series         = props.series;

        // Compute values ranges
        let dateMin  = null;
        let dateMax  = null;
        let valueMin = null;
        let valueMax = null;

        series = series.map((time, i) => {
            // Set min/max dates
            const date = (new Date(time.date)).getTime();
            dateMin  = Boolean(dateMin) ? Math.min(dateMin, date) : date;
            dateMax  = Boolean(dateMax) ? Math.max(dateMax, date) : date;

            // Set min/max values
            const points = time.points;
            points.forEach((point) => {
                const value = point.value;
                valueMin = Boolean(valueMin) ? Math.min(valueMin, value) : value;
                valueMax = Boolean(valueMax) ? Math.max(valueMax, value) : value;
            });

            return {
                date,
                points
            };
        });

        // Sort by date
        series.sort((a, b) => a.date - b.date);

        // Set minValue if set
        if (typeof minValue != 'undefined' && minValue < valueMin) {
            valueMin = minValue;
        }

        // Auto-fill
        if (props.autoFill) {
            let autoFillStartTime  = props.autoFillStartTime;
            let autoFillEndTime    = props.autoFillEndTime;
            const autoFillInterval = props.autoFillInterval;
            const autoFillValue    = props.autoFillValue;

            // Set autoFill times to timestamps if provided
            if (Boolean(autoFillStartTime)) {
                autoFillStartTime = new Date(autoFillStartTime).getTime();
            }
            if (Boolean(autoFillEndTime)) {
                autoFillEndTime = new Date(autoFillEndTime).getTime();
            }
            // Set start and end time depending on options
            dateMin = Boolean(autoFillStartTime) ? autoFillStartTime : dateMin;
            dateMax = Boolean(autoFillEndTime) ? autoFillEndTime : dateMax;

            // Set endTime to construct serie
            const serieEndTime = Boolean(autoFillEndTime) ? dateMax : dateMax + autoFillInterval;

            // Set valueMin and valueMax
            valueMin = Math.min(valueMin, autoFillValue);
            valueMax = Math.max(valueMax, autoFillValue);

            // Construct time range
            const timeRange = [];
            for (let t = dateMin; t < serieEndTime; t += autoFillInterval) {
                timeRange.push(t);
            }

            // Fill current serie with existing points or with autoFillValue
            let seriesIndex = 0;

            series = timeRange.map((time, i) => {
                const data = series[seriesIndex];

                if (Boolean(data) && (data.date == time)) {
                    seriesIndex++;
                    return data;
                } else {
                    // Construct missing points
                    return {
                        date: time,
                        points: seriesStyle.map((style, serieI) => ({
                            serie: style.title || serieI,
                            value: autoFillValue,
                            color: style.color || defaultColor
                        }))
                    };
                }
            });
        }

        if (valueMax == valueMin) {
            valueMax = valueMin + 1;
        }

        // Compute axe sizes
        const axeXHeight = props.textFontSize * 3;
        const axeYWidth  = valueMax.toFixed(0).length * props.textFontSize * 1.5 + props.axeMarkerWidth;

        const axeXLength = width - 2 * padding - axeYWidth;
        const axeYLength = height - 2 * padding - axeXHeight;

        // Compute body size
        const innerX = axeYWidth + padding;
        const innerY = height - (axeXHeight + padding);

        const yBase = padding;
        const yTop  = height - padding;

        // No tooltip by default
        const hovered = null;

        return {
            width,
            height,
            series,
            dateMin,
            dateMax,
            valueMin,
            valueMax,
            axeXLength,
            axeYLength,
            innerX,
            innerY,
            yTop,
            yBase,
            hovered
        };
    },

    setHovered(params) {
        this.setState({
            hovered: params
        });
    },

    renderTooltip() {
        const { hovered } = this.state;
        if (!hovered) {
            return null;
        }

        const { x, points } = hovered;

        const sumPointsY = points.reduce((total, point) => {
            return total + point.y;
        }, 0);
        const tooltipY = Math.floor(sumPointsY / points.length);

        // Pretty display date
        let pointsDateStr = (new Date(points[0].date)).toLocaleString();
        pointsDateStr = pointsDateStr.split(' ')[0].split('-').join('/');

        return (
            <div className="time-graph-tooltip" style={{ left: x + 10, top: tooltipY - 20 }}>
                <h6 className="points-date">
                    <DateSpan date={new Date(points[0].date)} format="dddd, MMMM D, YYYY" />
                </h6>
                <table className="points-details">
                    <tbody>
                        <tr className="points-colors">
                        {points.map(point => <td style={{ backgroundColor: point.color }}></td>)}
                        </tr>

                        <tr className="points-values">
                        {points.map(point => <td><b>{point.value}</b> {point.serie}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    },

    render() {
        const {
            width,
            height,
            series,
            dateMin,
            dateMax,
            valueMin,
            valueMax,
            axeXLength,
            axeYLength,
            innerX,
            innerY,
            yTop,
            yBase
        } = this.state;

        return (
            <div className="time-graph">
                {this.renderTooltip()}
                <svg width={width} height={height} viewBox={'0 0 ' + width + ' ' + height} preserveAspectRatio="xMidYMid meet">
                    <XAxis length={axeXLength}
                        dateMin={dateMin}
                        dateMax={dateMax}
                        innerX={innerX}
                        yTop={yTop} />
                    <YAxis length={axeYLength}
                        valueMin={valueMin}
                        valueMax={valueMax}
                        innerX={innerX}
                        innerY={innerY}
                        yBase={yBase} />
                    <Body series={series}
                        dateMin={dateMin}
                        dateMax={dateMax}
                        valueMin={valueMin}
                        valueMax={valueMax}
                        width={axeXLength}
                        height={axeYLength}
                        innerX={innerX}
                        innerY={innerY}
                        yBase={yBase}
                        setHovered={this.setHovered} />
                </svg>
            </div>
        );
    }
});

module.exports = TimeGraph;
