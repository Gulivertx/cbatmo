import React from 'react';
import { Colors } from "@blueprintjs/core";

import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAMain } from "../models/NetatmoNAMain";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    station_data: INetatmoNAMain|undefined
    device_id: string|undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Main station */
const NetatmoModuleStation: React.FunctionComponent<AllProps> = (props) => {
    return (
        <ModuleLayout
            label={props.station_data?.module_name}
            reachable={props.station_data?.reachable}
            vertical_divider={true}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="temperature" onClick={() => props.fetchMeasure(props.device_id as string, props.device_id as string, ['Temperature'])}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>Temperature</div>
                        {props.station_data?.data?.temperature}<small>°C</small>
                    </div>
                    <div className="humidity" onClick={() => props.fetchMeasure(props.device_id as string, props.device_id as string, ['Humidity'])}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Humidity</div>
                        {props.station_data?.data?.humidity}<small>%</small>
                    </div>
                </div>
                <div className="row">
                    <div className="co2" onClick={() => props.fetchMeasure(props.device_id as string, props.device_id as string, ['CO2'])}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>co2</div>
                        {props.station_data?.data?.co2}<small>ppm</small>
                    </div>
                    <div className="noise" onClick={() => props.fetchMeasure(props.device_id as string, props.device_id as string, ['Noise'])}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Noise</div>
                        {props.station_data?.data?.noise}<small>dB</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleStation
