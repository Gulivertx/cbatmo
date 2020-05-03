import React from 'react';
import { Flex, Box } from 'reflexbox'

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
            <Flex flexDirection='column' width={[ '100%', '65%' ]}>
                <Flex flexWrap='wrap' flex={1}>
                    <ModuleForecastContainer />
                    {
                        available_modules?.INDOOR ? (
                            <Box width={[ '100%', '50%' ]}>
                                <ModuleNetatmoIndoorContainer />
                            </Box>
                        ) : null
                    }
                    {
                        available_modules?.RAIN ? (
                            <Box width={[ '100%', '50%' ]}>
                                <ModuleNetatmoRainContainer />
                            </Box>
                        ) : null
                    }
                    {
                        available_modules?.WIND ? (
                            <Box width={[ '100%', '50%' ]}>
                                <ModuleNetatmoWindContainer />
                            </Box>
                        ) : null
                    }
                    <Box width={[ '100%', '50%' ]}>
                        <ModuleNetatmoGraphContainer />
                    </Box>
                </Flex>
                <ModuleNetatmoInformationContainer />
            </Flex>
        )
    } else {
        // No additional modules
        return (
            <Flex flexDirection='column' width={[ '100%', '65%' ]}>
                <ModuleForecastContainer />
                <ModuleNetatmoGraphContainer />
                <ModuleNetatmoInformationContainer />
            </Flex>
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
                            <Flex flexDirection='column' width={[ '100%', '35%' ]}>
                                <ModuleDateTimeContainer/>
                                <ModuleNetatmoStationContainer />
                                <ModuleNetatmoOutdoorContainer />
                                <ModuleNetatmoBarometerContainer />
                            </Flex>
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
