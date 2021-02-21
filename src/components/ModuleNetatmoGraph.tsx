import React from 'react';
import { Alignment, Button, ButtonGroup, Colors } from "@blueprintjs/core";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import removeAccents from 'remove-accents';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import ModuleLayout from "../layouts/ModuleLayout";
import {colorChooser} from "../utils/tools";
import * as netatmoActions from "../store/netatmo/actions";
import {ConnectedReduxProps} from "../store";
import { Orientation } from "../store/application/types";
import {type} from "../apis/netatmo/types";
import StationData from "../apis/netatmo/models/StationData";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    phone?: string
    mobile?: string
    orientation: Orientation
    measure_data: []
    selected_types: type[]
    selected_module: string
    selected_timelapse: Cbatmo.graph_timelapse
    station_data: StationData
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
        const { modules } = this.props.station_data;

        if (module_id === this.props.station_data?.main_data.id) {
            return this.props.station_data.main_data.module_name;
        }

        const module = modules.find(module => module.id === module_id);
        if (module) return module.module_name;

        return ''
    };

    private handleOnclick = (timelapse: Cbatmo.graph_timelapse): void => {
        this.props.fetchMeasure(this.props.station_data?.main_data.id as string, this.props.selected_module, this.props.selected_types, timelapse);
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
                    <ResponsiveContainer height={this._setGraphHeight(!!this.props.phone, this.props.orientation, this.props.station_data.modules.length)}>
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
                    {removeAccents(this.findModuleName(this.props.selected_module))} - {this.props.t('netatmo.' + this.props.selected_types[0].toLowerCase())}
                </div>
            </ModuleLayout>
        )
    }
}

export default withTranslation('common')(NetatmoModuleGraph)
