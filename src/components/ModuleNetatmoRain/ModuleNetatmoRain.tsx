import React from 'react';
import { Colors } from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import {Flex} from 'reflexbox';
import ModuleNetatmoRainGraphContainer from "../../containers/ModuleNetatmoRainGraphContainer";
import ModuleLayout from "../../layouts/ModuleLayout";
import {PropsFromRedux} from "./ModuleNetatmoRain.container";
import RainModuleData from "../../apis/netatmo/models/RainModuleData";

interface IProps {
    module_data: RainModuleData
}

const NetatmoModuleRain: React.FunctionComponent<PropsFromRedux & WithTranslation & IProps> = (props) => {
    return (
        <ModuleLayout
            label={props.module_data?.module_name}
            reachable={props.module_data?.reachable}
            vertical_divider={props.orientation === 'landscape'}
            icon='rain'
            radioLevel={props.module_data?.radio_level}
            batteryLevel={props.module_data?.battery_level}
        >
            <div className="modules-layout">
                <Flex flexDirection='row'>
                    <div style={{width: props.orientation === 'portrait' ? '78%' : '60%'}}>
                        <ModuleNetatmoRainGraphContainer />
                    </div>
                    <Flex flexDirection='column' style={{width: props.orientation === 'portrait' ? '22%' : '40%'}}>
                        <div onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Rain'], props.selected_timelapse)} style={{textAlign: 'right'}}>
                            <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.cumulative')}</div>
                            {props.module_data?.sum_rain_24}<small>{props.distance_unit}</small>
                        </div>
                        <div onClick={() => props.fetchMeasure(props.device_id as string, props.module_data?.id as string, ['Rain'], props.selected_timelapse)} style={{textAlign: 'right'}}>
                            <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.distance_unit}/h</div>
                            {props.module_data?.sum_rain_1}
                        </div>
                    </Flex>
                </Flex>
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleRain)
