import React from 'react';
import {Colors} from "@blueprintjs/core";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';
import {Orientation} from "../store/application/types";
import {INetatmoNAModule3} from "../models/NetatmoNAModule3";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module?: INetatmoNAModule3
    data: []
    phone?: string
    mobile?: string
    orientation?: Orientation
}

const ModuleNetatmoRainGraph: React.FunctionComponent<IPropsFromState> = (props) => {
    return(
        <ResponsiveContainer height={props.phone ? 90 : 108}>
            <BarChart
                //width={140}
                //height={props.phone ? 90 : 108}
                data={props.data}
                syncId="anyId"
                margin={{top: 10, right: 10, left: -30, bottom: 0}}
                key={`${props.module?.data?.sum_rain_24}-${props.module?.data?.sum_rain_1}`}
            >
                <CartesianGrid stroke={Colors.GRAY1} vertical={false}/>
                <YAxis tick={{fontSize: '10px', fill: Colors.GRAY4}} minTickGap={1} />
                <XAxis tick={{fontSize: '8px', fill: Colors.GRAY4}} dataKey='name' hide={props.orientation === 'landscape'} minTickGap={1} interval={4} />
                <Bar dataKey='Rain' fill={Colors.BLUE5} minPointSize={1} isAnimationActive={!!props.mobile}/>
            </BarChart>
        </ResponsiveContainer>
    )
};


export default ModuleNetatmoRainGraph
