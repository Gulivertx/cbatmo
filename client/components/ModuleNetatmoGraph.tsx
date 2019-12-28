import React from 'react';
import { Colors } from "@blueprintjs/core";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import ModuleLayout from "../layouts/ModuleLayout";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    data_main: [],
    data_indoor: [],
    data_outdoor: [],
    data_rain: [],
    data_wind: []
}

interface IState {
    data: any[]
}

/** Rain module */
class NetatmoModuleGraph extends React.Component<IPropsFromState, IState> {
    public state: IState = {
        data: []
    };

    private typeChooser = (type: string): void => {
        if (this.props.data_main.filter((item: any) => { return item.hasOwnProperty(type)})) {
            //this.props.data_main.map((item: any) => { data.push({name: item.name, 'Station': item.Temperature}) })
        }
        if (this.props.data_indoor.filter((item: any) => { return item.hasOwnProperty(type)})) {
            //this.props.data_indoor.map((item: any, index: number) => { data[index] = {'Indoor': item.Temperature} })
        }

        console.log(this.state.data);
    };

    public render() {
        return (
            <ModuleLayout
                label="Graph"
                reachable={true}
            >
                <div className="modules-layout">
                    <AreaChart
                        width={270}
                        height={110}
                        data={this.props.data_main}
                        syncId="anyId"
                        margin={{top: 10, right: 0, left: -30, bottom: 0}}
                    >
                        <CartesianGrid stroke='rgba(57, 70, 80, 0.4)'/>
                        <YAxis tick={{fontSize: '10px'}} minTickGap={1} />
                        <XAxis dataKey='name' hide={true} minTickGap={1} interval={0}/>
                        <Area type='monotone' dataKey="Temperature" stroke={Colors.GOLD5} fill='rgba(148,159,177,0.2)' strokeWidth={2} isAnimationActive={false}/>
                    </AreaChart>
                </div>
            </ModuleLayout>
        )
    }
}

export default NetatmoModuleGraph
