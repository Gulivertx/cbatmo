import React, { ReactNode } from 'react';
import * as darkskyActions from "../store/darksky/actions";
import * as netatmoActions from "../store/netatmo/actions";
import { ConnectedReduxProps } from "../store";
import { INetatmoNAMain } from "../models/NetatmoNAMain";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    children: ReactNode
    station_data: INetatmoNAMain|undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchDarksky: typeof darkskyActions.fetchDarksky
    fetchStationData: typeof netatmoActions.fetchStationData
    fetchMainMeasure: typeof netatmoActions.fetchMainMeasure
    fetchIndoorMeasure: typeof netatmoActions.fetchIndoorMeasure
    fetchOutdoorMeasure: typeof netatmoActions.fetchOutdoorMeasure
    fetchRainMeasure: typeof netatmoActions.fetchRainMeasure
    fetchWindMeasure: typeof netatmoActions.fetchWindMeasure
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

class DashboardLayout extends React.Component<AllProps> {
    private interval: number | undefined;

    public componentDidMount(): void {
        this.props.fetchDarksky();
        this.fetchNetatmoModulesMeasures();

        this.interval = setInterval(() => {
            this.props.fetchDarksky();
            this.props.fetchStationData();
            this.fetchNetatmoModulesMeasures();
        }, REFRESH_TIME);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    private fetchNetatmoModulesMeasures = (): void => {
        // @ts-ignore
        this.props.fetchMainMeasure(this.props.station_data?.id as string, this.props.station_data?.id as string, this.props.station_data?.data_type);

        if (this.props.station_data?.available_modules.INDOOR) {
            // @ts-ignore
            this.props.fetchIndoorMeasure(this.props.station_data?.id as string, this.props.station_data?.modules.INDOOR?.id as string, this.props.station_data?.modules.INDOOR?.data_type);
        }

        if (this.props.station_data?.available_modules.OUTDOOR) {
            // @ts-ignore
            this.props.fetchOutdoorMeasure(this.props.station_data?.id as string, this.props.station_data?.modules.OUTDOOR?.id as string, this.props.station_data?.modules.OUTDOOR?.data_type);
        }

        if (this.props.station_data?.available_modules.RAIN) {
            // @ts-ignore
            this.props.fetchRainMeasure(this.props.station_data?.id as string, this.props.station_data?.modules.RAIN?.id as string, this.props.station_data?.modules.RAIN?.data_type);
        }
    };

    public render() {
        return (
            <div className="dashboard-grid-layout">
                {this.props.children}
            </div>
        )
    }
}

export default DashboardLayout;
