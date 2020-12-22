import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import ModuleLayout from "../layouts/ModuleLayout";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";
import {Orientation} from "../store/application/types";
import {Timelapse} from "../types/netatmo";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    reachable?: boolean
    pressure?: number
    pressure_unit: string
    device_id: string|undefined
    selected_timelapse: Timelapse
    pressure_ratio: number
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

/** Outdoor module */
const NetatmoModuleBarmometer: React.FunctionComponent<AllProps> = (props) => {
    return (
        <ModuleLayout
            label={props.t('netatmo.barometer')}
            reachable={props.reachable}
            vertical_divider={props.orientation === 'landscape'}
            fill={true}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="pressure" onClick={() => props.fetchMeasure(props.device_id as string, props.device_id as string, ['Pressure'], props.selected_timelapse)}>
                        {props.pressure}<small>{props.pressure_unit}</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleBarmometer)
