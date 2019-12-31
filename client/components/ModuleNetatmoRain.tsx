import React from 'react';
import { Colors } from "@blueprintjs/core";
import ModuleNetatmoRainGraphContainer from "../containers/ModuleNetatmoRainGraphContainer";
import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAModule3 } from "../models/NetatmoNAModule3";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule3|undefined
    device_id: string|undefined
    selected_timelapse: '12h'|'1d'|'1m'
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Rain module */
const NetatmoModuleRain: React.FunctionComponent<AllProps> = (props) => {
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
                    <div className="rain-24" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Rain'], props.selected_timelapse)}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Daily</div>
                        {props.module_data?.data?.sum_rain_24 ? props.module_data?.data?.sum_rain_24.toFixed(1) : '0'}<small>mm</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleRain
