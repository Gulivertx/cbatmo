import React from 'react';
import {Line} from 'react-chartjs-2';
import PropTypes from "prop-types";

//import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const intervalMinutes = 1, refreshTime = intervalMinutes * 60 * 1000;

class NetatmoChartLine extends React.Component {

    componentWillMount() {
        this.props.fetchMeasureData(this.props.device, this.props.module, this.props.type);

        this.interval = setInterval(() => {
            this.props.fetchMeasureData(this.props.device, this.props.module, this.props.type);
        }, refreshTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            this.props.loading ? (
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
    /*render() {
        return(
            this.props.loading ? (null) : (
                <AreaChart
                    width={500}
                    height={75}
                    data={this.props.data}
                    syncId="anyId"
                    margin={{top: 10, right: 0, left: -30, bottom: 0}}
                >
                    <CartesianGrid strokeDasharray="1 1"/>
                    <YAxis tick={{fontSize: '10px'}}/>
                    <Area type='monotone' dataKey='temp' stroke={this.props.color} fill={this.props.color} />
                </AreaChart>
                )
        )
    }*/
}

NetatmoChartLine.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    offsetMin: PropTypes.number.isRequired,
    offsetMax: PropTypes.number.isRequired,
    device: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fetchMeasureData: PropTypes.func.isRequired
};


export default NetatmoChartLine