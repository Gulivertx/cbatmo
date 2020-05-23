import React, { ReactNode } from 'react';
import * as openweatherActions from "../store/openweather/actions";
import * as netatmoActions from "../store/netatmo/actions";
import * as applicationActions from "../store/application/actions";
import { ConnectedReduxProps } from "../store";
import { INetatmoNAMain } from "../models/NetatmoNAMain";
import {Types} from "../models/NetatmoChartsData";
import {Orientation} from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    children: ReactNode
    station_data: INetatmoNAMain|undefined
    selected_module: string
    selected_types: Types[]
    selected_station_type: Types
    selected_outdoor_type: Types
    selected_indoor_type: Types
    selected_indoor_second_type: Types
    selected_indoor_third_type: Types
    selected_timelapse: '12h'|'1d'|'1m'
    mobile?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchOpenWeather: typeof openweatherActions.fetchOpenWeather
    fetchStationData: typeof netatmoActions.fetchStationData
    fetchMeasure: typeof netatmoActions.fetchMeasure
    fetchMeasures: typeof netatmoActions.fetchMeasures
    fetchRainMeasure: typeof netatmoActions.fetchRainMeasure
    setOrientation: typeof applicationActions.setOrientation
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

class DashboardLayout extends React.Component<AllProps> {
    private interval: number | undefined;

    public componentDidMount(): void {
        // Get current orientation
        const angle = window.orientation; // Deprecated feature but only this work on iOS Safari
        this.props.setOrientation(this._getOrientation(angle as number));

        // Listen mobile orientation
        window.addEventListener('orientationchange', (e: Event) => {
            const angle = window.orientation;
            this.props.setOrientation(this._getOrientation(angle as number));
        }, true)

        this.props.fetchOpenWeather();

        // Fetch on app load all modules measures
        this._fetchNetatmoModulesMeasures();

        this.interval = setInterval(() => {
            this.props.fetchOpenWeather();
            this.props.fetchStationData();
            this._fetchNetatmoModulesMeasures();
        }, REFRESH_TIME);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    private _getOrientation = (angle: number): Orientation => {
        if (angle === 0) {
            return 'portrait';
        } else {
            return 'landscape';
        }
    }

    private _fetchNetatmoModulesMeasures = (): void => {
       if (!!this.props.mobile) {
           this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data?.id as string, this.props.station_data?.data_type as Types[], '1d', 'station');

           if (this.props.station_data?.available_modules.OUTDOOR) {
               this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data.modules.OUTDOOR?.id as string, this.props.station_data.modules.OUTDOOR?.data_type as Types[], '1d', 'outdoor');
           }
           if (this.props.station_data?.available_modules.INDOOR) {
               this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data.modules.INDOOR?.id as string, this.props.station_data.modules.INDOOR?.data_type as Types[], '1d', 'indoor');
           }
           if (this.props.station_data?.available_modules.INDOOR_SECOND) {
               this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data.modules.INDOOR_SECOND?.id as string, this.props.station_data.modules.INDOOR_SECOND?.data_type as Types[], '1d', 'indoor_second');
           }
           if (this.props.station_data?.available_modules.INDOOR_THIRD) {
               this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data.modules.INDOOR_THIRD?.id as string, this.props.station_data.modules.INDOOR_THIRD?.data_type as Types[], '1d', 'indoor_third');
           }
       }

        if (this.props.station_data?.available_modules.RAIN) {
            this.props.fetchRainMeasure(this.props.station_data?.id as string, this.props.station_data?.modules.RAIN?.id as string);
        }

        this.props.fetchMeasure(this.props.station_data?.id as string, this.props.selected_module as string, this.props.selected_types, this.props.selected_timelapse);
    };

    public render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export default DashboardLayout;
