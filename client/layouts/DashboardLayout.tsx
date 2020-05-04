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
    selected_timelapse: '12h'|'1d'|'1m'
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchOpenWeather: typeof openweatherActions.fetchOpenWeather
    fetchStationData: typeof netatmoActions.fetchStationData
    fetchMeasure: typeof netatmoActions.fetchMeasure
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

        // Fetch on app load the temperature measure of Indoor module
        this.props.fetchMeasure(this.props.station_data?.id as string, this.props.station_data?.modules.OUTDOOR?.id as string, ['Temperature'], this.props.selected_timelapse);

        // Fetch on app load the rain measure
        if (this.props.station_data?.available_modules.RAIN) {
            this.props.fetchRainMeasure(this.props.station_data?.id as string, this.props.station_data?.modules.RAIN?.id as string);
        }

        this.interval = setInterval(() => {
            this.props.fetchOpenWeather();
            this.props.fetchStationData();
            this.fetchNetatmoModulesMeasures();
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

    private fetchNetatmoModulesMeasures = (): void => {
        this.props.fetchMeasure(this.props.station_data?.id as string, this.props.selected_module as string, this.props.selected_types, this.props.selected_timelapse);

        if (this.props.station_data?.available_modules.RAIN) {
            this.props.fetchRainMeasure(this.props.station_data?.id as string, this.props.station_data?.modules.RAIN?.id as string);
        }
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
