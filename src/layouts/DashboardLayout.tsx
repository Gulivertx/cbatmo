import React, {PropsWithChildren} from 'react';
import {Orientation} from "../store/application/types";
import {PropsFromRedux} from "./DashboardLayout.container";
import {type} from "../apis/netatmo/types";

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

class DashboardLayout extends React.Component<PropsWithChildren<PropsFromRedux>> {
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

        this.interval = window.setInterval(() => {
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
        // Todo fetch all for graphs
       // if (!!this.props.mobile) {
       //     this.props.fetchMeasures(
       //         this.props.station_data?.main_data.id as string,
       //         this.props.station_data?.main_data.id as string,
       //         this.props.station_data?.main_data.data_type as type[],
       //         '1d',
       //         'station'
       //     );
       //
       //     if (this.props.station_data?.available_modules.outdoor) {
       //         this.props.fetchMeasures(
       //             this.props.station_data?.main_data.id as string,
       //             this.props.station_data.modules.OUTDOOR?.id as string,
       //             this.props.station_data.modules.OUTDOOR?.data_type as Netatmo.data_type[],
       //             '1d',
       //             'outdoor'
       //         );
       //     }
       //     if (this.props.station_data?.available_modules.indoor1) {
       //         this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data.modules.INDOOR?.id as string, this.props.station_data.modules.INDOOR?.data_type as Netatmo.data_type[], '1d', 'indoor');
       //     }
       //     if (this.props.station_data?.available_modules.indoor2) {
       //         this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data.modules.INDOOR_SECOND?.id as string, this.props.station_data.modules.INDOOR_SECOND?.data_type as Netatmo.data_type[], '1d', 'indoor_second');
       //     }
       //     if (this.props.station_data?.available_modules.indoor3) {
       //         this.props.fetchMeasures(this.props.station_data?.id as string, this.props.station_data.modules.INDOOR_THIRD?.id as string, this.props.station_data.modules.INDOOR_THIRD?.data_type as Netatmo.data_type[], '1d', 'indoor_third');
       //     }
       // }

        // if (this.props.station_data?.available_modules.rain) {
        //     this.props.fetchRainMeasure(
        //         this.props.station_data?.main_data.id as string,
        //         this.props.station_data?.modules.RAIN?.id as string
        //     );
        // }

        // this.props.fetchMeasure(
        //     this.props.station_data?.main_data.id as string,
        //     this.props.selected_module as string,
        //     this.props.selected_types,
        //     this.props.selected_timelapse
        // );
    };

    public render() {
        return (
            this.props.children
        )
    }
}

export default DashboardLayout;
