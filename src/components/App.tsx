import React, {RefObject} from 'react';
import { Flex, Box } from 'reflexbox'
//import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

/** React layouts **/
import MainLayout from '../layouts/MainLayout';
import DashboardLayoutContainer from "../layouts/DashboardLayout.container";

/** React components **/
import AppStartingContainer from "./AppStarting.container";
import ModuleNetatmoInformationContainer from "./ModuleNetatmoInfo/ModuleNetatmoInformation.container";
import ModuleDateTimeContainer from "./ModuleDateTime/ModuleDateTime.container";
import ModuleNetatmoMainContainer from "./ModuleNetatmoMain/ModuleNetatmoMain.container";
import ModuleNetatmoOutdoorContainer from "./ModuleNetatmoOutdoor/ModuleNetatmoOutdoor.container";
import ModuleNetatmoIndoorContainer from "./ModuleNetatmoIndoor/ModuleNetatmoIndoor.container";
import ModuleNetatmoRainContainer from "./ModuleNetatmoRain/ModuleNetatmoRain.container";
import ModuleNetatmoWindContainer from "./ModuleNetatmoWind/ModuleNetatmoWind.container";
import ModuleNetatmoBarometerContainer from "./ModuleNetatmoBarometer/ModuleNetatmoBarometer.container";
import ModuleForecastContainer from "./ModuleForecast/ModuleForecast.container";
import ModuleNetatmoGraphContainer from "../containers/ModuleNetatmoGraphContainer";

import { Orientation } from "../store/application/types";
import {PropsFromRedux} from "./App.container";
import {AvailableModules} from "../apis/netatmo/interfaces/ApiStationData";
import {modules} from "../apis/netatmo/types";
import IndoorModuleData from "../apis/netatmo/models/IndoorModuleData";
import OutdoorModuleData from "../apis/netatmo/models/OutdoorModuleData";
import RainModuleData from "../apis/netatmo/models/RainModuleData";
import WindModuleData from "../apis/netatmo/models/WindModuleData";

class App extends React.Component<PropsFromRedux> {
    private lockScrollElement: RefObject<any> = React.createRef();

    /*public componentDidMount() {
        //disableBodyScroll(this.lockScrollElement.current);
    }*/

    /*public componentDidUpdate(prevProps: Readonly<AllProps>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.orientation !== this.props.orientation && this.props.orientation === 'portrait') {
            //setTimeout(() => disableBodyScroll(this.lockScrollElement.current), 1000)
        } else {
            //enableBodyScroll(this.lockScrollElement.current)
        }
    }*/

    public render() {
        const { available_modules, number_of_additional_modules, orientation, mobile, phone, tablet } = this.props;

        return (
            <MainLayout>
                {
                    !this.props.isStarting ? (
                        <DashboardLayoutContainer>
                            {
                                this._layoutChooser(mobile, phone, tablet, orientation, available_modules, number_of_additional_modules)
                            }
                        </DashboardLayoutContainer>
                    ) : (
                        <AppStartingContainer />
                    )
                }
            </MainLayout>
        )
    }

    private _layoutChooser = (
        mobile?: string,
        phone?: string,
        tablet?: string,
        orientation?: Orientation,
        available_modules?: AvailableModules,
        number_of_additional_modules?: number
    ) => {
        // If we are in desktop render the RPI layout 800x480
        // TODO create a view for desktop with bigger screen
        if (!mobile) return this._renderRpiLayout(available_modules, number_of_additional_modules);

        // Mobile renders
        if (!!phone && orientation === 'landscape') return this._renderPhoneLandscapeLayout(available_modules, number_of_additional_modules);
        if (!!phone && orientation === 'portrait') return this._renderPhonePortraitLayout(available_modules);
        if (!!tablet && orientation === 'landscape') return this._renderTabletLandscapeLayout(available_modules, number_of_additional_modules);
        if (!!tablet && orientation === 'portrait') return this._renderTabletPortraitLayout(available_modules, number_of_additional_modules);
    }

    private _renderRpiLayout = (available_modules?: AvailableModules, number_of_additional_modules?: number) => {
        if (available_modules?.indoor1 ||
            available_modules?.indoor2 ||
            available_modules?.indoor3 ||
            available_modules?.rain ||
            available_modules?.wind) {
            return (
                <React.Fragment>
                    <Flex flexDirection='column' width={[ '100%', '35%' ]}>
                        <ModuleDateTimeContainer/>
                        <ModuleNetatmoMainContainer />
                        <ModuleNetatmoOutdoorContainer module_data={this.props.modules?.find(module => module.type === modules.outdoor) as OutdoorModuleData} />
                        <ModuleNetatmoBarometerContainer />
                    </Flex>
                    <Flex flexDirection='column' width={[ '100%', '65%' ]}>
                        <Flex flexWrap='wrap' flex={1}>
                            <ModuleForecastContainer />

                            {
                                available_modules?.indoor1 && (
                                    <Box width={number_of_additional_modules !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        {
                                            this.props.modules?.filter(module => module.type === modules.indoor).map((module, index) =>
                                                    this.props.selected_indoor_module === index && (
                                                        <ModuleNetatmoIndoorContainer module_data={module as IndoorModuleData} />
                                                    )
                                                )
                                        }
                                    </Box>
                                )
                            }

                            {
                                (available_modules?.indoor2 || available_modules?.indoor3) && number_of_additional_modules as number <= 3 && (
                                    this.props.modules?.filter(module => module.type === modules.indoor).map((module, index) =>
                                            index !== 0 && (
                                            <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                                <ModuleNetatmoIndoorContainer module_data={module as IndoorModuleData} />
                                            </Box>
                                        )
                                    )
                                )
                            }

                            {
                                available_modules?.rain ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoRainContainer module_data={this.props.modules?.find(module => module.type === modules.rain) as RainModuleData} />
                                    </Box>
                                ) : null
                            }

                            {
                                available_modules?.wind ? (
                                    <Box  width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoWindContainer module_data={this.props.modules?.find(module => module.type === modules.wind) as WindModuleData} />
                                    </Box>
                                ) : null
                            }
                            <Box  width={number_of_additional_modules as number !== 1 && number_of_additional_modules as number !== 2 ?
                                [ '100%', '50%' ] : '100%'}>
                                <ModuleNetatmoGraphContainer />
                            </Box>
                        </Flex>
                        <ModuleNetatmoInformationContainer />
                    </Flex>
                </React.Fragment>
            )
        } else {
            // No additional modules
            return (
                <React.Fragment>
                    <Flex flexDirection='column' width={[ '100%', '35%' ]}>
                        <ModuleDateTimeContainer/>
                        <ModuleNetatmoMainContainer />
                        <ModuleNetatmoOutdoorContainer module_data={this.props.modules?.find(module => module.type === modules.outdoor) as OutdoorModuleData} />
                        <ModuleNetatmoBarometerContainer />
                    </Flex>
                    <Flex flexDirection='column' width={[ '100%', '65%' ]}>
                        <ModuleForecastContainer />
                        <ModuleNetatmoGraphContainer />
                        <ModuleNetatmoInformationContainer />
                    </Flex>
                </React.Fragment>
            )
        }
    }

    private _renderPhoneLandscapeLayout = (available_modules?: AvailableModules, number_of_additional_modules?: number) => {
        return this._renderRpiLayout(available_modules, number_of_additional_modules);
    }

    private _renderPhonePortraitLayout = (available_modules?: AvailableModules) => {
        return (
            <Flex flexDirection='column' width={'100%'}>
                <Flex flexDirection='column' ref={this.lockScrollElement} style={{overflowY: 'auto'}}>
                    <ModuleNetatmoInformationContainer />
                    <ModuleNetatmoOutdoorContainer module_data={this.props.modules?.find(module => module.type === modules.outdoor) as OutdoorModuleData} />
                    <ModuleNetatmoMainContainer />
                    {
                        this.props.modules && this.props.modules.filter(module => module.type === modules.indoor).map((module,index) =>
                            <ModuleNetatmoIndoorContainer module_data={module as IndoorModuleData} />
                        )
                    }
                    {
                        available_modules?.rain && (
                            <ModuleNetatmoRainContainer module_data={this.props.modules?.find(module => module.type === modules.rain) as RainModuleData} />
                        )
                    }
                    {
                        available_modules?.wind && (
                            <ModuleNetatmoWindContainer module_data={this.props.modules?.find(module => module.type === modules.wind) as WindModuleData} />
                        )
                    }
                </Flex>
                <ModuleForecastContainer />
            </Flex>
        )
    }

    private _renderTabletLandscapeLayout = (available_modules?: AvailableModules, number_of_additional_modules?: number) => {
        return this._renderRpiLayout(available_modules, number_of_additional_modules);
    }

    private _renderTabletPortraitLayout = (available_modules?: AvailableModules, number_of_additional_modules?: number) => {
        return this._renderRpiLayout(available_modules, number_of_additional_modules);
    }
}

export default App
