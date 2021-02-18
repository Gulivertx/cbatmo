import React, {RefObject} from 'react';
import { Flex, Box } from 'reflexbox'
//import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

/** React layouts **/
import MainLayout from '../layouts/MainLayout';
import DashboardLayoutContainer from "../layouts/DashboardLayout.container";

/** React components **/
import AppStartingContainer from "./AppStarting.container";
import ModuleNetatmoInformationContainer from "../containers/ModuleNetatmoInformationContainer";
import ModuleDateTimeContainer from "../containers/ModuleDateTimeContainer";
import ModuleNetatmoStationContainer from "../containers/ModuleNetatmoStationContainer";
import ModuleNetatmoOutdoorContainer from "../containers/ModuleNetatmoOutdoorContainer";
import ModuleNetatmoIndoorContainer from "../containers/ModuleNetatmoIndoorContainer";
import ModuleNetatmoIndoorSecondContainer from "../containers/ModuleNetatmoIndoorSecondContainer";
import ModuleNetatmoIndoorThirdContainer from "../containers/ModuleNetatmoIndoorThirdContainer";
import ModuleNetatmoRainContainer from "../containers/ModuleNetatmoRainContainer";
import ModuleNetatmoWindContainer from "../containers/ModuleNetatmoWindContainer";
import ModuleNetatmoBarometerContainer from "../containers/ModuleNetatmoBarometerContainer";
import ModuleForecastContainer from "../containers/ModuleForecastContainer";
import ModuleNetatmoGraphContainer from "../containers/ModuleNetatmoGraphContainer";

import { Orientation } from "../store/application/types";
import {PropsFromRedux} from "./App.container";
import {AvailableModules} from "../apis/netatmo/interfaces/ApiStationData";

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
                <>
                    <Flex flexDirection='column' width={[ '100%', '35%' ]}>
                        <ModuleDateTimeContainer/>
                        <ModuleNetatmoStationContainer />
                        <ModuleNetatmoOutdoorContainer />
                        <ModuleNetatmoBarometerContainer />
                    </Flex>
                    <Flex flexDirection='column' width={[ '100%', '65%' ]}>
                        <Flex flexWrap='wrap' flex={1}>
                            <ModuleForecastContainer />
                            {
                                available_modules?.indoor1 ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        {
                                            this.props.selected_indoor_module === 0 ? (
                                                <ModuleNetatmoIndoorContainer />
                                            ) : null
                                        }
                                        {
                                            this.props.selected_indoor_module === 1 ? (
                                                <ModuleNetatmoIndoorSecondContainer />
                                            ) : null
                                        }
                                        {
                                            this.props.selected_indoor_module === 2 ? (
                                                <ModuleNetatmoIndoorThirdContainer />
                                            ) : null
                                        }
                                    </Box>
                                ) : null
                            }
                            {
                                available_modules?.indoor2 && number_of_additional_modules as number <= 3 ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoIndoorSecondContainer />
                                    </Box>
                                ) : null
                            }
                            {
                                available_modules?.indoor3 && number_of_additional_modules as number <= 3 ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoIndoorThirdContainer />
                                    </Box>
                                ) : null
                            }
                            {
                                available_modules?.rain ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoRainContainer />
                                    </Box>
                                ) : null
                            }
                            {
                                available_modules?.wind ? (
                                    <Box  width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoWindContainer />
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
                </>
            )
        } else {
            // No additional modules
            return (
                <>
                    <Flex flexDirection='column' width={[ '100%', '35%' ]}>
                        <ModuleDateTimeContainer/>
                        <ModuleNetatmoStationContainer />
                        <ModuleNetatmoOutdoorContainer />
                        <ModuleNetatmoBarometerContainer />
                    </Flex>
                    <Flex flexDirection='column' width={[ '100%', '65%' ]}>
                        <ModuleForecastContainer />
                        <ModuleNetatmoGraphContainer />
                        <ModuleNetatmoInformationContainer />
                    </Flex>
                </>
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
                    <ModuleNetatmoOutdoorContainer />
                    <ModuleNetatmoStationContainer />
                    {
                        available_modules?.indoor1 && (
                            <ModuleNetatmoIndoorContainer module_name='indoor' />
                        )
                    }
                    {
                        available_modules?.indoor2 && (
                            <ModuleNetatmoIndoorSecondContainer module_name='indoor_second' />
                        )
                    }
                    {
                        available_modules?.indoor3 && (
                            <ModuleNetatmoIndoorThirdContainer module_name='indoor_third' />
                        )
                    }
                    {
                        available_modules?.rain && (
                            <ModuleNetatmoRainContainer />
                        )
                    }
                    {
                        available_modules?.wind && (
                            <ModuleNetatmoWindContainer />
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
