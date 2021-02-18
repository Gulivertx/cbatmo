import React, {RefObject} from 'react';
import { Flex, Box } from 'reflexbox'
//import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

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
import ModuleNetatmoIndoorSecondContainer from "../containers/ModuleNetatmoIndoorSecondContainer";
import ModuleNetatmoIndoorThirdContainer from "../containers/ModuleNetatmoIndoorThirdContainer";
import ModuleNetatmoRainContainer from "../containers/ModuleNetatmoRainContainer";
import ModuleNetatmoWindContainer from "../containers/ModuleNetatmoWindContainer";
import ModuleNetatmoBarometerContainer from "../containers/ModuleNetatmoBarometerContainer";
import ModuleForecastContainer from "../containers/ModuleForecastContainer";
import ModuleNetatmoGraphContainer from "../containers/ModuleNetatmoGraphContainer";

import { ConnectedReduxProps } from '../store';
import { IAvailableModules } from "../models/NetatmoNAMain";
import { Orientation } from "../store/application/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    isConfigured: boolean
    isStarting: boolean
    orientation?: Orientation
    mobile?: string
    phone?: string
    tablet?: string
    available_modules: IAvailableModules|undefined
    number_of_additional_modules?: number
    selected_indoor_module: number
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

class App extends React.Component<AllProps> {
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
        available_modules?: IAvailableModules,
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

    private _renderRpiLayout = (available_modules?: IAvailableModules, number_of_additional_modules?: number) => {
        if (available_modules?.INDOOR ||
            available_modules?.INDOOR_SECOND ||
            available_modules?.INDOOR_THIRD ||
            available_modules?.RAIN ||
            available_modules?.WIND) {
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
                                available_modules?.INDOOR ? (
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
                                available_modules?.INDOOR_SECOND && number_of_additional_modules as number <= 3 ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoIndoorSecondContainer />
                                    </Box>
                                ) : null
                            }
                            {
                                available_modules?.INDOOR_THIRD && number_of_additional_modules as number <= 3 ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoIndoorThirdContainer />
                                    </Box>
                                ) : null
                            }
                            {
                                available_modules?.RAIN ? (
                                    <Box width={number_of_additional_modules as number !== 1 ? [ '100%', '50%' ] : '100%'}>
                                        <ModuleNetatmoRainContainer />
                                    </Box>
                                ) : null
                            }
                            {
                                available_modules?.WIND ? (
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

    private _renderPhoneLandscapeLayout = (available_modules?: IAvailableModules, number_of_additional_modules?: number) => {
        return this._renderRpiLayout(available_modules, number_of_additional_modules);
    }

    private _renderPhonePortraitLayout = (available_modules?: IAvailableModules) => {
        return (
            <Flex flexDirection='column' width={'100%'}>
                <Flex flexDirection='column' ref={this.lockScrollElement} style={{overflowY: 'auto'}}>
                    <ModuleNetatmoInformationContainer />
                    <ModuleNetatmoOutdoorContainer />
                    <ModuleNetatmoStationContainer />
                    {
                        available_modules?.INDOOR && (
                            <ModuleNetatmoIndoorContainer module_name='indoor' />
                        )
                    }
                    {
                        available_modules?.INDOOR_SECOND && (
                            <ModuleNetatmoIndoorSecondContainer module_name='indoor_second' />
                        )
                    }
                    {
                        available_modules?.INDOOR_THIRD && (
                            <ModuleNetatmoIndoorThirdContainer module_name='indoor_third' />
                        )
                    }
                    {
                        available_modules?.RAIN && (
                            <ModuleNetatmoRainContainer />
                        )
                    }
                    {
                        available_modules?.WIND && (
                            <ModuleNetatmoWindContainer />
                        )
                    }
                </Flex>
                <ModuleForecastContainer />
            </Flex>
        )
    }

    private _renderTabletLandscapeLayout = (available_modules?: IAvailableModules, number_of_additional_modules?: number) => {
        return this._renderRpiLayout(available_modules, number_of_additional_modules);
    }

    private _renderTabletPortraitLayout = (available_modules?: IAvailableModules, number_of_additional_modules?: number) => {
        return this._renderRpiLayout(available_modules, number_of_additional_modules);
    }
}

export default App
