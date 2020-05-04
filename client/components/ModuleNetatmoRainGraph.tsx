import React from 'react';
import {Colors} from "@blueprintjs/core";
import {BarChart, Bar, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    device?: string
    module?: string
    data: []
    phone?: string
}

const ModuleNetatmoRainGraph: React.FunctionComponent<IPropsFromState> = (props) => {
    return(
        <ResponsiveContainer height={props.phone ? 90 : 108}>
            <BarChart
                //width={140}
                //height={props.phone ? 90 : 108}
                data={props.data}
                syncId="anyId"
                margin={{top: 10, right: 40, left: -30, bottom: 0}}
            >
                <CartesianGrid stroke={Colors.GRAY1} vertical={false}/>
                <YAxis tick={{fontSize: '10px'}} minTickGap={1} />
                <Bar dataKey='Rain' fill={Colors.BLUE5} minPointSize={1} isAnimationActive={false}/>
            </BarChart>
        </ResponsiveContainer>
    )
};


export default ModuleNetatmoRainGraph
