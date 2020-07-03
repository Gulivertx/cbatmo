import React from 'react';
import {Button, ButtonGroup, Colors} from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from "recharts";

import ModuleLayout from "../layouts/ModuleLayout";

import { INetatmoNAMain } from "../models/NetatmoNAMain";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";
import {Orientation} from "../store/application/types";
import {colorChooser} from "../utils/tools";
import {Types} from "../models/NetatmoChartsData";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    station_data: INetatmoNAMain|undefined
    selected_timelapse: '12h'|'1d'|'1m'
    temperature_unit: string
    pressure_unit: string
    orientation: Orientation
    selected_type: Types
    measure_data: []
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch extends WithTranslation {
    [key: string]: any
    fetchMeasure: typeof netatmoActions.fetchMeasure
    onChangeSelectedType: typeof netatmoActions.onChangeSelectedType
    t: i18next.TFunction
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

/** Main station */
const NetatmoModuleStation: React.FunctionComponent<AllProps> = (props) => {
    const _onClick = (type: string) => {
        if (props.orientation !== 'portrait') {
            props.fetchMeasure(props.station_data?.id as string, props.station_data?.id as string, [type], props.selected_timelapse);
        }
    }

    return (
        <ModuleLayout
            label={props.station_data?.module_name}
            reachable={props.station_data?.reachable}
            vertical_divider={props.orientation === 'landscape'}
            icon='station'
            radioLevel={props.station_data?.wifi}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="temperature" onClick={() => _onClick('Temperature')}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>{props.t('netatmo.temperature')}</div>
                        {props.station_data?.data?.temperature}<small>°{props.temperature_unit}</small>
                    </div>
                    {
                        props.orientation === 'portrait' && (
                            <div className="pressure" onClick={() => _onClick('Pressure')} style={{textAlign: 'center'}}>
                                <div className="sub-label" style={{ color: Colors.GRAY4 }}>{props.t('netatmo.barometer')}</div>
                                {props.station_data?.data?.pressure}<small>{props.pressure_unit}</small>
                            </div>
                        )
                    }
                    <div className="humidity" onClick={() => _onClick('Humidity')} style={{textAlign: 'right'}}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.humidity')}</div>
                        {props.station_data?.data?.humidity}<small>%</small>
                    </div>
                </div>
                <div className="row">
                    <div className="co2" onClick={() => _onClick('CO2')}>
                        <div className="sub-label" style={{ color: Colors.GRAY4 }}>co2</div>
                        {props.station_data?.data?.co2}<small>ppm</small>
                    </div>
                    <div className="noise" onClick={() => _onClick('Noise')} style={{textAlign: 'right'}}>
                        <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>{props.t('netatmo.noise')}</div>
                        {props.station_data?.data?.noise}<small>dB</small>
                    </div>
                </div>
                {
                    props.orientation === 'portrait' && (
                        <>
                            <ButtonGroup minimal={true} style={{paddingTop: 8}}>
                                {
                                    props.station_data?.data_type.map((type, index) =>
                                        <Button
                                            key={type}
                                            active={props.selected_type === type}
                                            onClick={() => props.onChangeSelectedType(type, 'station')}
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
                                        strokeWidth={2}
                                        isAnimationActive={true}
                                        animationEasing={'ease-in-out'}
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

export default withTranslation('common')(NetatmoModuleStation)
