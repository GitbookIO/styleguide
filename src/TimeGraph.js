var React  = require('react');
var moment = require('moment');

var TimeLine = React.createClass({
    propTypes: {
        currentX:   React.PropTypes.number,
        lineTop:    React.PropTypes.number,
        lineBottom: React.PropTypes.number,
        lastX:      React.PropTypes.number,
        lastPoints: React.PropTypes.array,
        points:     React.PropTypes.array
    },

    contextTypes: {
        pointRadius: React.PropTypes.number,
        lineWidth:   React.PropTypes.number,
        axeColor:    React.PropTypes.string
    },

    getInitialState() {
        return {
            hover: false
        };
    },

    setHover(state) {
        this.setState({
            hover: state
        });
    },

    renderPathLine(index) {
        var lastX = this.props.lastX;
        if (!Boolean(lastX)) {
            return null;
        }

        var currentX     = this.props.currentX;
        var currentPoint = this.props.points[index];
        var lastPoint    = this.props.lastPoints[index];

        return <line x1={lastX} y1={lastPoint.y} x2={currentX} y2={currentPoint.y}
            stroke={currentPoint.color} strokeWidth={this.context.lineWidth} />;
    },

    render() {
        var that       = this;
        var currentX   = this.props.currentX;
        var lineTop    = this.props.lineTop;
        var lineBottom = this.props.lineBottom;
        var points     = this.props.points;

        var hover = this.state.hover;

        return (
            <g>
                <line x1={currentX} x2={currentX} y1={lineTop} y2={lineBottom}
                    stroke={this.context.axeColor} strokeWidth={this.context.lineWidth} />

                {points.map(function(point, index) {
                    var color      = point.color;
                    // Default serie name to index
                    var dataSerie  = point.serie || index;

                    return (
                        <g key={index}>
                            {that.renderPathLine(index)}
                            <circle key={index}
                                className={'serie-point'+(hover? ' hover' : '')}
                                onMouseEnter={that.setHover.bind(that, true)}
                                onMouseLeave={that.setHover.bind(that, false)}
                                r={that.context.pointRadius}
                                fill={color}
                                strokeWidth={that.context.lineWidth * 2}
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

var Body = React.createClass({
    propTypes: {
        dateMin:   React.PropTypes.number,
        dateMax:   React.PropTypes.number,
        valueMin:  React.PropTypes.number,
        valueMax:  React.PropTypes.number,
        width:     React.PropTypes.number,
        height:    React.PropTypes.number,
        innerX:    React.PropTypes.number,
        innerY:    React.PropTypes.number,
        yBase:     React.PropTypes.number,
        series:    React.PropTypes.array
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
        return this.props.innerX + pX*this.props.width;
    },

    // Compute Y for a point inside Body
    innerPositionY(pY) {
        return this.props.yBase + (this.props.height * (1 - pY));
    },

    // Return inner X value for a date
    getInnerX(date) {
        return this.innerPositionX((date - this.props.dateMin)/(this.props.dateMax - this.props.dateMin));
    },

    // Return inner Y value for a value
    getInnerY(value) {
        return this.innerPositionY((value - this.props.valueMin)/(this.props.valueMax - this.props.valueMin));
    },

    // Return correct mapping for a point to draw in TimeLine
    formatPoint(time, point, index) {
        var seriesStyle = this.context.seriesStyle;
        var serieStyle = seriesStyle[index];

        return {
            color: point.color || (serieStyle? serieStyle.color : null) || this.context.defaultColor,
            value: point.value,
            serie: point.serie || (serieStyle? serieStyle.title : index),
            date:  time.date,
            y:     this.getInnerY(point.value)
        };
    },

    // Draw this time line
    drawTimeLine(time, i, series) {
        var that = this;

        // Current time informations
        var currentX   = that.getInnerX(time.date);
        var lineTop    = that.props.yBase;
        var lineBottom = that.props.yBase + that.props.height;

        var points = time.points.map(that.formatPoint.bind(that, time));

        // Last time informations
        var lastX      = null;
        var lastPoints = null;
        var lastTime   = series[i - 1];

        if (Boolean(lastTime)) {
            lastX      = that.getInnerX(lastTime.date);
            lastPoints = lastTime.points.map(that.formatPoint.bind(that, lastTime));
        }

        return (
            <TimeLine key={i}
                currentX={currentX}
                lineTop={lineTop}
                lineBottom={lineBottom}
                points={points}
                lastX={lastX}
                lastPoints={lastPoints} />
        );
    },

    render() {
        var series = this.props.series;

        return (
            <g>
            {series.map(this.drawTimeLine, this)}
            </g>
        );
    }
});

var XAxis = React.createClass({
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
        var dateMin = this.props.dateMin;
        var dateMax = this.props.dateMax;

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
                interval: 1*1000
            },
            {
                format: 'H:mm',
                interval: 60*1000
            },
            {
                format: 'H',
                interval: 60*60*1000
            },
            {
                format: 'DD/MM',
                interval: 1*24*60*60*1000
            },
            {
                format: 'DD/MM',
                interval: 7*24*60*60*1000
            },
            {
                format: 'DD/MM',
                interval: 30*24*60*60*1000
            },
            {
                format: 'YYYY',
                interval: 365*24*60*60*1000
            },
            {
                format: 'YYYY',
                interval: 10*365*24*60*60*1000
            },
            {
                format: 'YYYY',
                interval: 100*365*24*60*60*1000
            }
        ].filter(function(interval) {
            var count = (dateMax - dateMin)/interval.interval;
            return count > 1;
        })
        .map(function(interval) {
            var count = (dateMax - dateMin)/interval.interval;
            return { count, interval };
        })
        .sort(function(a, b) {
            return a.count > b.count;
        })[0].interval;
    },

    render() {
        var that    = this;
        var dateMin = this.props.dateMin;
        var dateMax = this.props.dateMax;
        var length  = this.props.length;
        var innerX  = this.props.innerX;
        var yTop    = this.props.yTop;

        // Compute intervals for rendering dates
        var valuePerInterval = this.getValuePerInterval();
        var wPerMS           = length/(dateMax - dateMin);
        var axeXInterval     = ((dateMax - dateMin) * wPerMS) / (this.context.textFontSize * 10);

        // Construct range of intervals
        var intervalRange = [];
        for (var i = 0; i < axeXInterval; i++) {
            intervalRange.push(i);
        }

        return (
            <g>
            {intervalRange.map(function(i) {
                var value = i * valuePerInterval.interval;
                var date  = new Date(dateMin + value);

                var x = innerX + (value * wPerMS);
                // Don't draw point if too far
                if (x > innerX + length) {
                    return null;
                }

                return <text key={i} x={x} y={yTop}
                    fontFamily={that.context.textFontFamily} fontSize={that.context.textFontSize}
                    fill={that.context.textColor} textAnchor="middle">{moment(date).format(valuePerInterval.format)}</text>;
            })}
            </g>
        );
    }
});

var YAxis = React.createClass({
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
        var valueMin = this.props.valueMin;
        var valueMax = this.props.valueMax;

        var range     = valueMax - valueMin;
        var minimum   = range / maxTicks;
        var magnitude = Math.pow(10, Math.floor(Math.log(minimum) / Math.log(10)));
        var residual  = minimum / magnitude;

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
        var that         = this;
        var valueMin     = this.props.valueMin;
        var valueMax     = this.props.valueMax;
        var length       = this.props.length;
        var axeYInterval = this.props.axeYInterval;
        var innerX       = this.props.innerX;
        var innerY       = this.props.innerY;
        var yBase        = this.props.yBase;

        var hPerValue    = length/(valueMax - valueMin);
        axeYInterval = ((valueMax - valueMin) * hPerValue) / (this.context.textFontSize * 4);

        // Calcul perfect value per interval (1, 10, 100, 1000, ...)
        var valuePerInterval = that.optimalTickStep(axeYInterval);
        // Construct range of intervals
        var intervalRange = [];
        for (var i = 0; i < axeYInterval+1; i++) {
            intervalRange.push(i);
        }

        return (
            <g>
                {intervalRange.map(function(i) {
                    var value        = i * valuePerInterval;
                    var y            = innerY - (value * hPerValue);
                    var displayValue = value + valueMin;

                    // Don't draw point if is too high
                    if (y < yBase) {
                        return null;
                    }

                    var textX  = innerX - (2*that.context.axeMarkerWidth);
                    var lineX1 = innerX - that.context.axeMarkerWidth;
                    var lineX2 = innerX;

                    return (
                        <g key={i}>
                            <text x={textX} y={y}
                                fontFamily={that.context.textFontFamily} fontSize={that.context.textFontSize}
                                textAnchor="end" fill={that.context.textColor}>{displayValue}</text>
                            <line x1={lineX1} x2={lineX2} y1={y} y2={y}
                                stroke={that.context.axeColor} strokeWidth={that.context.lineWidth} />
                        </g>
                    );
                })}
            </g>
        );
    }
});

var TimeGraph = React.createClass({
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
        var width        = props.width;
        var height       = props.height;
        var padding      = props.padding;
        var series       = props.series;
        var minValue     = props.minValue;
        var defaultColor = props.defaultColor;
        var seriesStyle  = props.seriesStyle;

        // Compute values ranges
        var dateMin  = null;
        var dateMax  = null;
        var valueMin = null;
        var valueMax = null;

        series = series.map(function(time, i) {
            // Set min/max dates
            var date = (new Date(time.date)).getTime();
            dateMin  = Boolean(dateMin)? Math.min(dateMin, date) : date;
            dateMax  = Boolean(dateMax)? Math.max(dateMax, date) : date;

            // Set min/max values
            var points = time.points;
            points.forEach(function(point) {
                var value = point.value;
                valueMin = Boolean(valueMin)? Math.min(valueMin, value) : value;
                valueMax = Boolean(valueMax)? Math.max(valueMax, value) : value;
            });

            return {
                date,
                points
            };
        });

        // Sort by date
        series.sort(function(a, b) {
            return a.date - b.date;
        });

        // Set minValue if set
        if (typeof minValue != 'undefined' && minValue < valueMin) {
            valueMin = minValue;
        }

        // Auto-fill
        if (props.autoFill) {
            var autoFillStartTime = props.autoFillStartTime;
            var autoFillEndTime   = props.autoFillEndTime;
            var autoFillInterval  = props.autoFillInterval;
            var autoFillValue     = props.autoFillValue;

            // Set autoFill times to timestamps if provided
            if (Boolean(autoFillStartTime)) {
                autoFillStartTime = new Date(autoFillStartTime).getTime();
            }
            if (Boolean(autoFillEndTime)) {
                autoFillEndTime = new Date(autoFillEndTime).getTime();
            }
            // Set start and end time depending on options
            dateMin = Boolean(autoFillStartTime)? autoFillStartTime : dateMin;
            dateMax = Boolean(autoFillEndTime)? autoFillEndTime : dateMax;

            // Set endTime to construct serie
            var serieEndTime = Boolean(autoFillEndTime)? dateMax : dateMax + autoFillInterval;

            // Set valueMin and valueMax
            valueMin = Math.min(valueMin, autoFillValue);
            valueMax = Math.max(valueMax, autoFillValue);

            // Construct time range
            var timeRange = [];
            for (var t = dateMin; t < serieEndTime; t += autoFillInterval) {
                timeRange.push(t);
            }

            // Fill current serie with existing points or with autoFillValue
            var seriesIndex = 0;

            series = timeRange.map(function(time, i) {
                var data = series[seriesIndex];

                if (Boolean(data) && (data.date == time)) {
                    seriesIndex++;
                    return data;
                } else {
                    // Construct missing points
                    return {
                        date: time,
                        points: seriesStyle.map(function(style, i) {
                            return {
                                serie: style.title || i,
                                value: autoFillValue,
                                color: style.color || defaultColor
                            };
                        })
                    };
                }
            });
        }

        if (valueMax == valueMin) {
            valueMax = valueMin + 1;
        }

        // Compute axe sizes
        var axeXHeight = props.textFontSize * 3;
        var axeYWidth  = valueMax.toFixed(0).length * props.textFontSize * 1.5 + props.axeMarkerWidth;

        var axeXLength = width - 2*padding - axeYWidth;
        var axeYLength = height - 2*padding - axeXHeight;

        // Compute body size
        var innerX = axeYWidth + padding;
        var innerY = height - (axeXHeight + padding);

        var yBase = padding;
        var yTop  = height - padding;

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
            yBase
        };
    },

    render() {
        var width      = this.state.width;
        var height     = this.state.height;
        var series     = this.state.series;
        var dateMin    = this.state.dateMin;
        var dateMax    = this.state.dateMax;
        var valueMin   = this.state.valueMin;
        var valueMax   = this.state.valueMax;
        var axeXLength = this.state.axeXLength;
        var axeYLength = this.state.axeYLength;
        var innerX     = this.state.innerX;
        var innerY     = this.state.innerY;
        var yTop       = this.state.yTop;
        var yBase      = this.state.yBase;

        return (
            <svg className="time-graph" width={width} height={height} viewBox={'0 0 '+width+' '+height} preserveAspectRatio="xMidYMid meet">
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
                    yBase={yBase} />
            </svg>
        );
    }
});

module.exports = TimeGraph;
