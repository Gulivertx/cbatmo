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
import ModuleNetatmoGraphContainer from "../containers/ModuleNetatmoGraphContainer";

import { ConnectedReduxProps } from '../store';
import {IAvailableModules} from "../models/NetatmoNAMain";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    isConfigured: boolean
    available_modules: IAvailableModules|undefined
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

// Return the the available modules
const layoutChooser = (available_modules: IAvailableModules|undefined) => {
    if (available_modules?.INDOOR && available_modules?.RAIN && available_modules?.WIND) {
        // All modules available
        return (
            <div className="second-column">
                <ModuleForecastContainer />
                <div className="row-grid">
                    <ModuleNetatmoIndoorContainer />
                    <ModuleNetatmoRainContainer />
                </div>
                <div className="row-grid">
                    <ModuleNetatmoWindContainer />
                    <ModuleNetatmoGraphContainer />
                </div>
                <ModuleNetatmoInformationContainer />
            </div>
        )
    } else if (available_modules?.INDOOR || available_modules?.RAIN || available_modules?.WIND) {
        // only one additional available
        return (
            <div className="second-column">
                <ModuleForecastContainer />
                <div className="row-grid">
                    {
                        available_modules?.INDOOR ? (
                            <ModuleNetatmoIndoorContainer />
                        ) : (<div />)
                    }
                    {
                        available_modules?.RAIN ? (
                            <ModuleNetatmoRainContainer />
                        ) : (<div />)
                    }
                </div>
                <div className="row-grid">
                    {
                        available_modules?.WIND ? (
                            <ModuleNetatmoWindContainer />
                        ) : (<div />)
                    }
                    <ModuleNetatmoGraphContainer />
                </div>
                <ModuleNetatmoInformationContainer />
            </div>
        )
    } else {
        // No additional modules
        return (
            <div className="second-column">
                <ModuleForecastContainer />
                <div className="row" style={{gridRow: '2 / 4'}}>
                    <ModuleNetatmoGraphContainer />
                </div>
                <ModuleNetatmoInformationContainer />
            </div>
        )
    }
};

class App extends React.Component<AllProps> {
    public render() {
        const { available_modules } = this.props;

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
                            {layoutChooser(available_modules)}
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
