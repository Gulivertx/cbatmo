import React from 'react';
import removeAccents from 'remove-accents';
import { Colors } from "@blueprintjs/core";

import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAMain } from "../models/NetatmoNAMain";
import { setWifiStatusIcon } from "../utils/tools";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    station_data: INetatmoNAMain|undefined
}

/** Main station */
const NetatmoModuleStation: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout label={props.station_data? removeAccents(props.station_data.module_name) : ''}>
            <div className="namain-layout">
                <div className="row">
                    <div className="temperature">
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>Temperature</div>
                        {props.station_data?.data?.temperature}<small>°C</small>
                    </div>
                    <div className="humidity">
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Humidity</div>
                        {props.station_data?.data?.humidity}<small>%</small>
                    </div>
                </div>
                <div className="row">
                    <div className="co2">
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>co2</div>
                        {props.station_data?.data?.co2}<small>ppm</small>
                    </div>
                    <div className="noise">
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Noise</div>
                        {props.station_data?.data?.noise}<small>dB</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleStation
