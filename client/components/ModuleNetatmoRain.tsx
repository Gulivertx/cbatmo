import React from 'react';
import { Colors } from "@blueprintjs/core";
import ModuleNetatmoRainGraphContainer from "../containers/ModuleNetatmoRainGraphContainer";
import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAModule3 } from "../models/NetatmoNAModule3";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule3|undefined
}

/** Rain module */
const NetatmoModuleRain: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="graph">
                        <ModuleNetatmoRainGraphContainer />
                    </div>
                    <div className="rain-24">
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Daily</div>
                        {props.module_data?.data?.sum_rain_24 ? props.module_data?.data?.sum_rain_24.toFixed(1) : '0'}<small>mm</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleRain
