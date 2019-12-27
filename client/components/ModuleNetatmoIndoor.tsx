import React from 'react';
import { Colors } from "@blueprintjs/core";

import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAModule4 } from "../models/NetatmoNAModule4";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule4|undefined
}

/** Outdoor module */
const NetatmoModuleIndoor: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            last_seen={props.module_data?.last_seen}
            fill={true}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="temperature">
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>Temperature</div>
                        {props.module_data?.data?.temperature}<small>°C</small>
                    </div>
                    <div className="humidity">
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Humidity</div>
                        {props.module_data?.data?.humidity}<small>%</small>
                    </div>
                </div>
                <div className="row">
                    <div className="co2">
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>co2</div>
                        {props.module_data?.data?.co2}<small>ppm</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleIndoor
