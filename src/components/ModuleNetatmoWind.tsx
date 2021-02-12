import React from 'react';
import { Colors } from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import ModuleLayout from "../layouts/ModuleLayout";
import { INetatmoNAModule2 } from "../models/NetatmoNAModule2";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";
import {Orientation} from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    module_data: INetatmoNAModule2|undefined
    device_id: string|undefined
    unit: string
    selected_timelapse: Netatmo.timelapse
    wind_ratio: number
    orientation: Orientation
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch extends WithTranslation {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
    t: i18next.TFunction
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Rain module */
const NetatmoModuleWind: React.FunctionComponent<AllProps> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            vertical_divider={props.orientation === 'landscape'}
            icon='wind'
            radioLevel={props.module_data?.radio}
            batteryLevel={props.module_data?.battery}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="wind-strength" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['windStrength'], props.selected_timelapse)}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>{props.t('netatmo.wind_strength')}</div>
                        {props.module_data?.data?.wind_strength}<small>{props.unit}</small>
                    </div>

                    {
                        props.orientation === 'portrait' && (
                            <div className="wind-orientation">
                                <i className={'wind-icon wi wi-wind from-' + props.module_data?.data?.wind_angle + '-deg'}/>
                            </div>
                        )
                    }

                    <div className="wind-max" style={{textAlign: 'right'}}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.wind_max_day')}</div>
                        {props.module_data?.data?.max_wind_str}<small>{props.unit}</small>
                    </div>
                </div>
                {
                    props.orientation === 'landscape' && (
                        <div className="row">
                            <div className="wind-orientation">
                                <i className={'wind-icon wi wi-wind from-' + props.module_data?.data?.wind_angle + '-deg'}/>
                            </div>
                        </div>
                    )
                }
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleWind)
