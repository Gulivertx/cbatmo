import React from 'react';
import { Colors } from "@blueprintjs/core";

import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAModule1 } from "../models/NetatmoNAModule1";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule1|undefined
    device_id: string|undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Outdoor module */
const NetatmoModuleOutdoor: React.FunctionComponent<AllProps> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            last_seen={props.module_data?.last_seen}
            vertical_divider={true}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="temperature" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Temperature'])}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>Temperature</div>
                        {props.module_data?.data?.temperature}<small>°C</small>
                    </div>
                    <div className="humidity" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Humidity'])}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Humidity</div>
                        {props.module_data?.data?.humidity}<small>%</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleOutdoor
