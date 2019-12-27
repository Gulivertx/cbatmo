import React from 'react';

/** React layouts **/
import MainLayout from '../layouts/MainLayout';
import DashboardLayoutContainer from "../layouts/DashboardLayoutContainer";

/** React components **/
import AppStartingContainer from "../containers/AppStartingContainer";
import ModuleNetatmoInformationContainer from "../containers/ModuleNetatmoInformationContainer";
import ModuleDateTimeContainer from "../containers/ModuleDateTimeContainer";
import ModuleNetatmoStationContainer from "../containers/ModuleNetatmoStationContainer";
import ModuleNetatmoOutdoorContainer from "../containers/ModuleNetatmoOutdoorContainer";
import ModuleNetatmoIndoorContainer from "../containers/ModuleNetatmoIndoorContainer";
import ModuleNetatmoRainContainer from "../containers/ModuleNetatmoRainContainer";
import ModuleNetatmoWindContainer from "../containers/ModuleNetatmoWindContainer";
import ModuleNetatmoBarometerContainer from "../containers/ModuleNetatmoBarometerContainer";
import ModuleForecastContainer from "../containers/ModuleForecastContainer";
import ModuleNetatmoGraph from "../components/ModuleNetatmoGraph";

import { ConnectedReduxProps } from '../store';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    isConfigured: boolean
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

class App extends React.Component<AllProps> {
    public render() {
        return (
            <MainLayout>
                {
                    this.props.isConfigured ? (
                        <DashboardLayoutContainer>
                            <div className="first-column">
                                <ModuleDateTimeContainer/>
                                <ModuleNetatmoStationContainer />
                                <ModuleNetatmoOutdoorContainer />
                                <ModuleNetatmoBarometerContainer />
                            </div>
                            <div className="second-column">
                                <ModuleForecastContainer />
                                <div className="row-grid">
                                    <ModuleNetatmoIndoorContainer />
                                    <ModuleNetatmoRainContainer />
                                </div>
                                <div className="row-grid">
                                    <ModuleNetatmoWindContainer />
                                    <ModuleNetatmoGraph />
                                </div>
                                <ModuleNetatmoInformationContainer />
                            </div>
                        </DashboardLayoutContainer>
                    ) : (
                        <AppStartingContainer />
                    )
                }
            </MainLayout>
        )
    }
}

export default App
