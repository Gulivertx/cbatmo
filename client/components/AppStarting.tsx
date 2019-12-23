import React from 'react';
import { Colors, Icon, Spinner, Intent } from '@blueprintjs/core';

import { ContextMainLayout } from "../layouts/MainLayout";

import * as applicationActions from '../store/application/actions';
import * as netatmoActions from "../store/netatmo/actions";
import { ConnectedReduxProps } from '../store';
import { IApplicationInfoState } from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    loading_station_data: boolean
    info: IApplicationInfoState
    station_data_errors: any
    refresh_token: string
    access_token: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchAuth: typeof netatmoActions.fetchAuth
    fetchStationData: typeof netatmoActions.fetchStationData
    appConfigured: typeof applicationActions.appConfigured
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

class AppStarting extends React.Component<AllProps> {
    componentDidMount(): void {
        if (!this.props.refresh_token) {
            this.props.fetchAuth();
        } else {
            this.props.fetchStationData();
        }
    }

    componentDidUpdate(prevProps: Readonly<AllProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.loading_station_data && prevProps.loading_station_data !== this.props.loading_station_data) {
            if (!this.props.station_data_errors) {
                this.context.addToast('tick-circle', 'Configured with success, please wait...', Intent.SUCCESS);
                setTimeout(() => this.props.appConfigured(true), 2000);
            } else {
                this.context.addToast('error', 'Oops, an error occur!', Intent.DANGER);
            }
        }
    }

    public render() {
        const { info, station_data_errors } = this.props;

        return (
            <div className="starting-page-layout">
                <div className="content">
                    <h1 className="title">{info.name}</h1>
                    <h4 style={{ color: Colors.GRAY3 }}>Version {info.version}</h4>
                    <div className="description">{info.description}</div>

                    <div className="loader">
                        {
                            station_data_errors ? (
                                <Icon icon="error" iconSize={60} intent={Intent.DANGER} />
                            ) : (
                                <Spinner size={ Spinner.SIZE_STANDARD } />
                            )
                        }
                    </div>

                    {
                        station_data_errors ? (
                            <div>Ouch, an error occur!</div>
                        ) : (
                            <div>Loading...</div>
                        )
                    }
                </div>
                <div className="footer" style={{ color: Colors.GRAY3 }}>
                    Created by {info.author}
                </div>
            </div>
        )
    }
}

AppStarting.contextType = ContextMainLayout;

export default AppStarting
