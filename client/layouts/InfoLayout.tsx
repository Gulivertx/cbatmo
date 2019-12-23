import React from 'react';
import { Divider } from '@blueprintjs/core';

import InfoDateTime from '../components/InfoDateTime';
import InfoWeather from '../components/InfoWeather';
import ErrorBoundary from '../components/ErrorBoundary';
import { ConnectedReduxProps } from "../store";
import * as darkskyActions from "../store/darksky/actions";

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    darkskyData: any
    netatmoData: any
    loading: boolean
    first_fetch: boolean
    locale: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchDarksky: typeof darkskyActions.fetchDarksky
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

class InfoLayout extends React.Component<AllProps> {
    private interval: number | undefined;

    public componentDidMount(): void {
        this.props.fetchDarksky();

        this.interval = setInterval(() => {
            this.props.fetchDarksky();
        }, REFRESH_TIME);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    public render() {
        return (
            <div className="info-layout">
                <InfoDateTime locale={this.props.locale}/>
                <Divider />
                <ErrorBoundary>
                    {
                        !this.props.first_fetch && (
                            <InfoWeather darkskyData={this.props.darkskyData} netatmoData={this.props.netatmoData} locale={this.props.locale}/>
                        )
                    }
                </ErrorBoundary>
            </div>
        )
    }
}

export default InfoLayout;
