import React from 'react';
import PropTypes from "prop-types";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const intervalMinutes = 1, refreshTime = intervalMinutes * 60 * 1000;

class NetatmoChartLine extends React.Component {

    componentWillMount() {
        this.props.fetchMeasureData(this.props.device, this.props.module, this.props.data_type);

        this.interval = setInterval(() => {
            this.props.fetchMeasureData(this.props.device, this.props.module, this.props.data_type);
        }, refreshTime);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            this.props.loading ? (null) : (
                <AreaChart
                    width={this.props.width}
                    height={75}
                    data={this.props.data}
                    syncId="anyId"
                    margin={{top: 10, right: 0, left: -30, bottom: 0}}
                >
                    <CartesianGrid stroke='rgba(57, 70, 80, 0.4)'/>
                    <YAxis tick={{fontSize: '10px'}} minTickGap={1} />
                    <XAxis dataKey='name' hide={true} minTickGap={1} interval={0}/>
                    {/*<Tooltip />*/}
                    <Area type='monotone' dataKey={this.props.selected_type} stroke={this.props.color} fill='rgba(148,159,177,0.2)' strokeWidth={2}/>
                </AreaChart>
                )
        )
    }
}

NetatmoChartLine.propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    device: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    data_type: PropTypes.array.isRequired,
    selected_type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    fetchMeasureData: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
};


export default NetatmoChartLine