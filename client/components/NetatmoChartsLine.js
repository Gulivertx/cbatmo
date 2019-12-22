import React from 'react';
import PropTypes from "prop-types";
import { Colors } from "@blueprintjs/core";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const intervalMinutes = 1, refreshTime = intervalMinutes * 60 * 1000;

class NetatmoChartsLine extends React.Component {
    componentDidMount() {
        this.props.fetchMeasureData(this.props.device, this.props.module, this.props.data_type);

        this.interval = setInterval(() => {
            this.props.fetchMeasureData(this.props.device, this.props.module, this.props.data_type);
        }, refreshTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    chartOptions = (type) => {
        switch (type) {
            case 'Temperature':
                return {
                    stroke: Colors.GOLD4,
                };
            case 'CO2':
                return {
                    stroke: Colors.GREEN5,
                };
            case 'Humidity':
                return {
                    stroke: Colors.BLUE5,
                };
            case 'Noise':
                return {
                    stroke: Colors.RED5,
                };
            case 'Pressure':
                return {
                    stroke: Colors.COBALT5,
                };
            default:
                return {
                    stroke: Colors.WHITE,
                };
        }
    };

    axisOption = (type) => {
        switch (type) {
            case 'Temperature':
                return {
                    stroke: Colors.GOLD3,
                    width: 30,
                    orientation: 'left'
                };
            case 'CO2':
                return {
                    stroke: Colors.GREEN4,
                    width: 40,
                    orientation: 'right'
                };
            case 'Humidity':
                return {
                    stroke: Colors.BLUE3,
                    width: 30,
                    orientation: 'left'
                };
            case 'Noise':
                return {
                    stroke: Colors.RED3,
                    width: 30,
                    orientation: 'left'
                };
            case 'Pressure':
                return {
                    stroke: Colors.COBALT3,
                    width: 40,
                    orientation: 'right'
                };
            default:
                return {
                    stroke: Colors.WHITE,
                    width: 30,
                    orientation: 'left'
                };
        }
    };

    render() {
        return(
            <LineChart
                width={this.props.width}
                height={this.props.height || 75}
                data={this.props.data}
                margin={{top: 6, right: 0, left: 0, bottom: 6}}
            >
                <CartesianGrid stroke='rgba(57, 70, 80, 0.4)'/>
                {
                    this.props.data_type.map((type, index) =>
                        <YAxis key={index} {...this.axisOption(type)} yAxisId={type} dataKey={type} tick={{fontSize: '9px'}} minTickGap={1} />)
                }
                <XAxis dataKey='name' hide={true} minTickGap={1} interval={0}/>
                {
                    this.props.data_type.map((type, index) =>
                        <Line key={index} {...this.chartOptions(type)} yAxisId={type} dataKey={type} type='linear' fill='rgba(148,159,177,0.2)' strokeWidth={2} dot={false}/>)
                }
            </LineChart>
        )
    }
}

NetatmoChartsLine.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    device: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    data_type: PropTypes.array.isRequired,
    fetchMeasureData: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number
};


export default NetatmoChartsLine
