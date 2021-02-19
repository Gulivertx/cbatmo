import React from 'react';
import { Colors } from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import ModuleLayout from "../../layouts/ModuleLayout";
import {PropsFromRedux} from "./ModuleNetatmoWind.container";
import WindModuleData from "../../apis/netatmo/models/WindModuleData";

interface IProps {
    module_data: WindModuleData
}

const NetatmoModuleWind: React.FunctionComponent<PropsFromRedux & WithTranslation & IProps> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            vertical_divider={props.orientation === 'landscape'}
            icon='wind'
            radioLevel={props.module_data?.radio_level}
            batteryLevel={props.module_data?.battery_level}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="wind-strength" onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['windStrength'], props.selected_timelapse)}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>{props.t('netatmo.wind_strength')}</div>
                        {props.module_data?.wind_strength}<small>{props.unit}</small>
                    </div>

                    {
                        props.orientation === 'portrait' && (
                            <div className="wind-orientation">
                                <i className={'wind-icon wi wi-wind from-' + props.module_data?.wind_angle + '-deg'}/>
                            </div>
                        )
                    }

                    <div className="wind-max" style={{textAlign: 'right'}}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.wind_max_day')}</div>
                        {props.module_data?.max_wind_str}<small>{props.unit}</small>
                    </div>
                </div>
                {
                    props.orientation === 'landscape' && (
                        <div className="row">
                            <div className="wind-orientation">
                                <i className={'wind-icon wi wi-wind from-' + props.module_data?.wind_angle + '-deg'}/>
                            </div>
                        </div>
                    )
                }
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleWind)
