import React from 'react';
import { Colors } from "@blueprintjs/core";

import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAModule1 } from "../models/NetatmoNAModule1";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule1|undefined
}

/** Outdoor module */
const NetatmoModuleOutdoor: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            last_seen={props.module_data?.last_seen}
            vertical_divider={true}
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
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleOutdoor
