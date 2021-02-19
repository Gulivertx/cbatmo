import React from 'react';
import {Alignment, Button, ButtonGroup, Colors} from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import ModuleLayout from "../../layouts/ModuleLayout";
import {colorChooser} from "../../utils/tools";
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
                {
                    props.orientation === 'portrait' && (
                        <>
                            <ButtonGroup minimal={true} style={{paddingTop: 8}}>
                                {
                                    props.module_data?.data_type.map((type, index) =>
                                        <Button
                                            key={type}
                                            active={props.selected_type === type}
                                            onClick={() => props.onChangeSelectedType(type, props.module_name)}
                                        >{props.t('netatmo.' + type.toLowerCase())}</Button>
                                    )
                                }
                            </ButtonGroup>
                            <ResponsiveContainer height={110}>
                                <AreaChart
                                    key={props.selected_type}
                                    data={props.measure_data}
                                    margin={{top: 14, right: 10, left: -30, bottom: 0}}
                                >
                                    <CartesianGrid stroke={Colors.GRAY1} />
                                    <YAxis tick={{fontSize: '10px', fill: Colors.GRAY4}} minTickGap={1} domain={['dataMin', 'dataMax']} />
                                    <XAxis tick={{fontSize: '8px', fill: Colors.GRAY4}} dataKey='name' hide={false} minTickGap={1} interval={4}/>
                                    <Area
                                        type='monotone'
                                        dataKey={props.selected_type}
                                        stroke={colorChooser(props.selected_type)}
                                        fill={colorChooser(props.selected_type)}
                                        strokeWidth={2} isAnimationActive={true}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </>
                    )
                }
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(NetatmoModuleIndoor)
