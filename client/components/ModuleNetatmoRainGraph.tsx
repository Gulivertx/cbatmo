import React from 'react';
import {Colors} from "@blueprintjs/core";
import { BarChart, Bar, YAxis, CartesianGrid } from 'recharts';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    device?: string
    module?: string
    data: []
}

const ModuleNetatmoRainGraph: React.FunctionComponent<IPropsFromState> = (props) => {
    return(
        <BarChart
            width={170}
            height={108}
            data={props.data}
            syncId="anyId"
            margin={{top: 10, right: 0, left: -30, bottom: 0}}
        >
            <CartesianGrid stroke={Colors.GRAY1} vertical={false}/>
            <YAxis tick={{fontSize: '10px'}} stroke={Colors.GRAY4} minTickGap={1} />
            <Bar dataKey='Rain' fill={Colors.BLUE5} minPointSize={1} isAnimationActive={false}/>
        </BarChart>
    )
};


export default ModuleNetatmoRainGraph
