import React from 'react';

import { BarChart, Bar, YAxis, CartesianGrid } from 'recharts';
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    device?: string
    module?: string
    data: []
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchRainMeasure: typeof netatmoActions.fetchRainMeasure
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

class ModuleNetatmoRainGraph extends React.Component<AllProps> {
    private interval: number | undefined;

    public componentDidMount(): void {
        this.props.fetchRainMeasure(this.props.device as string, this.props.module as string, 'Rain');

        this.interval = setInterval(() => {
            this.props.fetchRainMeasure(this.props.device as string, this.props.module as string, 'Rain');
        }, REFRESH_TIME);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    render() {
        return(
            <BarChart
                width={170}
                height={108}
                data={this.props.data}
                syncId="anyId"
                margin={{top: 10, right: 0, left: -30, bottom: 0}}
            >
                <CartesianGrid stroke='rgba(57, 70, 80, 0.4)' vertical={false}/>
                <YAxis tick={{fontSize: '10px'}} minTickGap={1} />
                <Bar dataKey='Rain' fill='#1e88e5' minPointSize={1}/>
            </BarChart>
        )
    }
}


export default ModuleNetatmoRainGraph
