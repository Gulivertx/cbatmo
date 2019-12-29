import React from 'react';
import { Colors } from "@blueprintjs/core";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from 'recharts';
import removeAccents from 'remove-accents';
import ModuleLayout from "../layouts/ModuleLayout";
import {Types} from "../models/NetatmoChartsData";
import {colorChooser} from "../utils/tools";
import {INetatmoNAMain} from "../models/NetatmoNAMain";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    measure_data: []
    selected_types: Types[]
    selected_module: string,
    station_data: INetatmoNAMain|undefined
}

/** Rain module */
class NetatmoModuleGraph extends React.Component<IPropsFromState> {

    private findModuleName = (module_id: string) => {
        // @ts-ignore
        const { modules } = this.props.station_data;

        if (module_id === this.props.station_data?.id) {
            return this.props.station_data.module_name;
        } else if (module_id === modules.INDOOR?.id) {
            return modules.INDOOR.module_name;
        } else if (module_id === modules.OUTDOOR?.id) {
            return modules.OUTDOOR.module_name;
        } else if (module_id === modules.RAIN?.id) {
            return modules.RAIN.module_name;
        } else if (module_id === modules.WIND?.id) {
            return modules.WIND.module_name;
        } else {
            return '';
        }
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
                        height={130}
                        data={this.props.measure_data}
                        margin={{top: 10, right: 0, left: -30, bottom: 8}}
                    >
                        <CartesianGrid stroke={Colors.GRAY1} />
                        <YAxis tick={{fontSize: '10px'}} stroke={Colors.GRAY4} minTickGap={1} />
                        <XAxis dataKey='name' hide={true} minTickGap={1} interval={0}/>
                        <Area
                            type='monotone'
                            dataKey={this.props.selected_types[0]}
                            stroke={colorChooser(this.props.selected_types[0])}
                            fill='rgba(148,159,177,0.2)'
                            strokeWidth={2} isAnimationActive={false}
                        />
                    </AreaChart>
                </div>
                <div className="sub-label" style={{textAlign: 'center'}}>
                    {removeAccents(this.findModuleName(this.props.selected_module))} - {this.props.selected_types[0]}
                </div>
            </ModuleLayout>
        )
    }
}

export default NetatmoModuleGraph
