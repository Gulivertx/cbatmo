import React from 'react';
import {Line} from 'react-chartjs-2';
import PropTypes from "prop-types";

const intervalMinutes = 10, refreshTime = intervalMinutes * 60 * 1000;

class NetatmoChartLine extends React.Component {

    componentWillMount() {
        this.props.fetchNetatmoMeasurenData(this.props.device, this.props.module, this.props.type);

        this.interval = setInterval(() => {
            this.props.fetchNetatmoMeasurenData(this.props.device, this.props.module, this.props.type);
        }, refreshTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            this.props.isFirstFetch ? (
                null
            ) : (
                <Line
                    data={{
                        labels: this.props.labels,
                        datasets: [
                            {
                                fill: true,
                                lineTension: 0.3,
                                backgroundColor: 'rgba(148,159,177,0.2)',
                                borderColor: this.props.color,
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: '#35424b)',
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 0,
                                pointHitRadius: 10,
                                data: this.props.data
                            }
                        ]
                    }}
                    legend={{display: false}}
                    options={{
                        animation: false,
                        responsive: true,
                        maintainAspectRatio: false,
                        tooltips: {enabled: false},
                        scales: {
                            xAxes: [{
                                display: true,
                                gridLines: {
                                    display: true,
                                    color: 'rgba(57, 70, 80, 0.4)',
                                },
                                ticks: {
                                    autoSkip: false,
                                    display: false,
                                    beginAtZero: true,
                                    fontColor: '#8a9ba1',
                                    fontSize: 8
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                    display: true,
                                    color: 'rgba(57, 70, 80, 0.4)'
                                },
                                ticks: {
                                    autoSkip: false,
                                    beginAtZero: true,
                                    min: Math.min(...this.props.data) - this.props.offsetMin,
                                    max: Math.max(...this.props.data) + this.props.offsetMax,
                                    fontColor: 'rgba(177, 188, 192, 0.47)',
                                    fontSize: 8,
                                    callback: (value, index, values) => {
                                        if (index === 0) return;
                                        if (index === values.length - 1) return;
                                        if (this.props.type === 'temperature') {
                                            return `${value}°`;
                                        }
                                        else if (this.props.type === 'rain') {
                                            return `${value}mm`;
                                        }
                                    }
                                }
                            }]
                        }
                    }}
                    height={85}/>
            )

        )
    }
}

NetatmoChartLine.propTypes = {
    isFirstFetch: PropTypes.bool,
    isFetching: PropTypes.bool,
    data: PropTypes.array,
    labels: PropTypes.array,
    offsetMin: PropTypes.number,
    offsetMax: PropTypes.number,
    device: PropTypes.string,
    module: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    access_token: PropTypes.string,
    refresh_token: PropTypes.string,
    expire_in: PropTypes.number,
};


export default NetatmoChartLine