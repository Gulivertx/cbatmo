import React, { ReactNode } from 'react';
import * as darkskyActions from "../store/darksky/actions";
import * as netatmoActions from "../store/netatmo/actions";
import { ConnectedReduxProps } from "../store";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    children: ReactNode
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchDarksky: typeof darkskyActions.fetchDarksky
    fetchStationData: typeof netatmoActions.fetchStationData
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

class DashboardLayout extends React.Component<AllProps> {
    private interval: number | undefined;

    public componentDidMount(): void {
        this.props.fetchDarksky();

        this.interval = setInterval(() => {
            this.props.fetchDarksky();
            this.props.fetchStationData();
        }, REFRESH_TIME);
    }

    public componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    public render() {
        return (
            <div className="dashboard-grid-layout">
                {this.props.children}
            </div>
        )
    }
}

export default DashboardLayout;
