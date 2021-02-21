import React from 'react';
import {Colors} from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import ModuleLayout from "../../layouts/ModuleLayout";
import {PropsFromRedux} from "./ModuleNetatmoIndoor.container";
import IndoorModuleData from "../../apis/netatmo/models/IndoorModuleData";

interface IProps {
    module_data: IndoorModuleData
}

/** Outdoor module */
const NetatmoModuleIndoor: React.FunctionComponent<PropsFromRedux & WithTranslation & IProps> = (props) => {
    const _onClick = (type: string) => {
        if (props.orientation !== 'portrait') {
            props.fetchMeasure(props.device_id as string, props.module_data?.id as string, [type], props.selected_timelapse);
        }
    }

    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            last_seen={props.module_data?.last_seen}
            vertical_divider={props.orientation === 'landscape'}
            icon='indoor'
            radioLevel={props.module_data?.radio_level}
            batteryLevel={props.module_data?.battery_level}
            number_of_additional_modules={props.number_of_additional_modules}
            onChangeSelectedInsideModule={props.onChangeSelectedInsideModule}
            selected_indoor_module={props.selected_indoor_module}
            indoor_module_names={props.indoor_module_names}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="temperature" onClick={() => _onClick('Temperature')}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>{props.t('netatmo.temperature')}</div>
                        {props.module_data?.temperature}<small>°{props.temperature_unit}</small>
                    </div>
                    {
                        props.orientation === 'portrait' && (
                            <div className="co2" onClick={() => _onClick('CO2')} style={{textAlign: 'center'}}>
                                <div className="sub-label" style={{ color: Colors.GRAY4 }}>co2</div>
                                {props.module_data?.co2}<small>ppm</small>
                            </div>
                        )
                    }
                    <div className="humidity" onClick={() => _onClick('Humidity')} style={{textAlign: 'right'}}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.humidity')}</div>
                        {props.module_data?.humidity}<small>%</small>
                    </div>
                </div>
                {
                    props.orientation !== 'portrait' && (
                        <div className="row">
                            <div className="co2" onClick={() => _onClick('CO2')}>
                                <div className="sub-label" style={{ color: Colors.GRAY4 }}>co2</div>
                                {props.module_data?.co2}<small>ppm</small>
                            </div>

                        </div>
                    )
                }
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleIndoor)
