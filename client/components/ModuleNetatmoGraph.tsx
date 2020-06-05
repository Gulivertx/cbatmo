import React from 'react';
import { Alignment, Button, ButtonGroup, Colors } from "@blueprintjs/core";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import removeAccents from 'remove-accents';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import ModuleLayout from "../layouts/ModuleLayout";
import {Types} from "../models/NetatmoChartsData";
import {colorChooser} from "../utils/tools";
import {INetatmoNAMain} from "../models/NetatmoNAMain";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";
import { Orientation } from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    phone?: string
    mobile?: string
    orientation: Orientation
    measure_data: []
    selected_types: Types[]
    selected_module: string
    selected_timelapse: '12h'|'1d'|'1m'
    station_data: INetatmoNAMain|undefined
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
class NetatmoModuleGraph extends React.Component<AllProps> {

    private findModuleName = (module_id: string) => {
        // @ts-ignore
        const { modules } = this.props.station_data;

        if (module_id === this.props.station_data?.id) {
            return this.props.station_data.module_name;
        } else if (module_id === modules.INDOOR?.id) {
            return modules.INDOOR.module_name;
        } else if (module_id === modules.INDOOR_SECOND?.id) {
            return modules.INDOOR_SECOND.module_name;
        } else if (module_id === modules.INDOOR_THIRD?.id) {
            return modules.INDOOR_THIRD.module_name;
        } else if (module_id === modules.OUTDOOR?.id) {
            return modules.OUTDOOR.module_name;
        } else if (module_id === modules.RAIN?.id) {
            return modules.RAIN.module_name;
        } else if (module_id === modules.WIND?.id) {
            return modules.WIND.module_name;
        } else {
            return '';
        }
    };

    private handleOnclick = (timelapse: '12h'|'1d'|'1m'): void => {
        this.props.fetchMeasure(this.props.station_data?.id as string, this.props.selected_module, this.props.selected_types, timelapse);
    };

    private _setGraphHeight = (phone: boolean, orientation: Orientation, number_of_additional_modules: number): number => {
        if (phone && orientation === 'portrait') {
            return 144
        } else if (phone && orientation === 'landscape') {
            if (number_of_additional_modules === 0) {
                return 94 * 2.6
            } else {
                return 94
            }
        } else {
            if (number_of_additional_modules === 0) {
                return 122 * 2.6
            } else {
                return 122
            }
        }
    }

    public render() {
        return (
            <ModuleLayout
                label={this.props.t('netatmo.graph')}
                reachable={true}
                fill={true}
                vertical_divider={true}
            >
                <div className="modules-layout">
                    <ButtonGroup className="toolbar" alignText={Alignment.CENTER} minimal={true}>
                        <Button
                            active={this.props.selected_timelapse === '12h'}
                            onClick={() => this.handleOnclick('12h')}
                        >12h</Button>
                        <Button
                            active={this.props.selected_timelapse === '1d'}
                            onClick={() => this.handleOnclick('1d')}
                        >1 {this.props.t('netatmo.day')}</Button>
                        <Button
                            active={this.props.selected_timelapse === '1m'}
                            onClick={() => this.handleOnclick('1m')}
                        >1 {this.props.t('netatmo.month')}</Button>
                    </ButtonGroup>
                    <ResponsiveContainer height={this._setGraphHeight(!!this.props.phone, this.props.orientation, this.props.station_data?.number_of_additional_modules as number)}>
                        <AreaChart
                            //width={240}
                            //height={this.props.phone ? 94 : 122}
                            data={this.props.measure_data}
                            margin={{top: 14, right: 10, left: -30, bottom: 8}}
                        >
                            <CartesianGrid stroke={Colors.GRAY1} />
                            <YAxis tick={{fontSize: '10px', fill: Colors.GRAY4}} minTickGap={1} domain={['dataMin', 'dataMax']} />
                            <XAxis dataKey='name' hide={true} minTickGap={1} interval={0}/>
                            <Area
                                type='monotone'
                                dataKey={this.props.selected_types[0]}
                                stroke={colorChooser(this.props.selected_types[0])}
                                fill='rgba(148,159,177,0.2)'
                                strokeWidth={2} isAnimationActive={!!this.props.mobile}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="sub-label" style={{textAlign: 'center'}}>
                    {removeAccents(this.findModuleName(this.props.selected_module))} - {this.props.selected_types[0]}
                </div>
            </ModuleLayout>
        )
    }
}

export default withTranslation('common')(NetatmoModuleGraph)
