import React from 'react';
import { Colors } from "@blueprintjs/core";

import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAModule2 } from "../models/NetatmoNAModule2";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule2|undefined
    unit: string
}

/** Rain module */
const NetatmoModuleWind: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            vertical_divider={true}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="wind-strength">
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>Wind strength</div>
                        {props.module_data?.data?.wind_strength}<small>{props.unit}</small>
                    </div>
                    <div className="wind-max">
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Max day</div>
                        {props.module_data?.data?.max_wind_str}<small>{props.unit}</small>
                    </div>
                </div>
                <div className="row">
                    <div className="wind-orientation">
                        <i className={'wind-icon wi wi-wind from-' + props.module_data?.data?.wind_angle + '-deg'}/>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleWind
