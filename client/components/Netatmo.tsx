import React from 'react';
import { Button, ButtonGroup, Alignment, Drawer, Position } from "@blueprintjs/core";

import NetatmoHeader from "./NetatmoHeader";
import NetatmoModuleNAMain from "./NetatmoModuleNAMain";
import NetatmoModuleNAModule4 from "./NetatmoModuleNAModule4";
import NetatmoModuleNAModule3 from "./NetatmoModuleNAModule3";
import NetatmoModuleNAModule1 from "./NetatmoModuleNAModule1";
import NetatmoModuleNAModule2 from "./NetatmoModuleNAModule2";
import { MODULE_TYPE } from "../models/NetatmoNAMain";
import { ConnectedReduxProps } from "../store";
import * as netatmoActions from "../store/netatmo/actions";

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    loading_station_data: boolean
    loading_refresh_token: boolean
    station_data: any
    locale: string
    user: any
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface IPropsFromDispatch {
    [key: string]: any
    fetchStationData: typeof netatmoActions.fetchStationData
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps;

interface IState {
    mainIsOpen: boolean
    indoorIsOpen: boolean
    outdoorIsOpen: boolean
    rainIsOpen: boolean
    windIsOpen: boolean
}

class Netatmo extends React.Component<AllProps, IState> {
    public state: IState = {
        mainIsOpen: false,
        indoorIsOpen: false,
        outdoorIsOpen: false,
        rainIsOpen: false,
        windIsOpen: false,
    };

    public componentDidMount(): void {
        setInterval(() => {
            this.props.fetchStationData();
        }, REFRESH_TIME);
    }

    private handleModuleMainOpen = (module: string): void => {
        switch (module) {
            case MODULE_TYPE.MAIN:
                this.setState({ mainIsOpen: true });
                break;
            case MODULE_TYPE.INDOOR:
                this.setState({ indoorIsOpen: true });
                break;
            case MODULE_TYPE.OUTDOOR:
                this.setState({ outdoorIsOpen: true });
                break;
            case MODULE_TYPE.RAIN:
                this.setState({ rainIsOpen: true });
                break;
            case MODULE_TYPE.WIND:
                this.setState({ windIsOpen: true });
                break;
            default:
                return;
        }
    };

    private handleClose = (module: string): void => {
        switch (module) {
            case MODULE_TYPE.MAIN:
                this.setState({ mainIsOpen: false });
                break;
            case MODULE_TYPE.INDOOR:
                this.setState({ indoorIsOpen: false });
                break;
            case MODULE_TYPE.OUTDOOR:
                this.setState({ outdoorIsOpen: false });
                break;
            case MODULE_TYPE.RAIN:
                this.setState({ rainIsOpen: false });
                break;
            case MODULE_TYPE.WIND:
                this.setState({ windIsOpen: false });
                break;
            default:
                return;
        }
    };

    public render() {
        const { station_data } = this.props;

        return (
            <div className="netatmo-wrapper">
                <NetatmoHeader data={station_data} locale={this.props.locale} />

                <div className="netatmo-content">

                </div>

                <ButtonGroup
                    alignText={Alignment.CENTER}
                    fill={true}
                >
                    <Button onClick={() => this.handleModuleMainOpen(station_data.type)}>{station_data.module_name}</Button>

                    {
                        Object.values(station_data.modules).map((module: any, index) => <Button key={index} onClick={() => this.handleModuleMainOpen(module.type)}>{module.module_name}</Button>)
                    }
                </ButtonGroup>

                {/* Main Station*/}
                <NetatmoModuleNAMain data={this.props.station_data} user={this.props.user} open={this.state.mainIsOpen} handleClose={this.handleClose} />

                {
                    //Module 4 - internal
                    this.props.station_data.available_modules.INDOOR && (
                        <NetatmoModuleNAModule4 data={this.props.station_data.modules.INDOOR} device_id={this.props.station_data.id} open={this.state.indoorIsOpen} handleClose={this.handleClose} />
                    )
                }

                {/*
                    // Module 3 - rain
                    this.props.station_data.available_modules.RAIN && (
                        <NetatmoModuleNAModule3 data={this.props.station_data.modules.RAIN} device_id={this.props.station_data.id} />
                    )
                */}

                {
                    // Module 1 - external
                    this.props.station_data.available_modules.OUTDOOR && (
                        <NetatmoModuleNAModule1 data={this.props.station_data.modules.OUTDOOR} device_id={this.props.station_data.id} open={this.state.outdoorIsOpen} handleClose={this.handleClose} />
                    )
                }

                {/*
                    // Module 4 - wind
                    this.props.station_data.available_modules.WIND && (
                        <NetatmoModuleNAModule2 data={this.props.station_data.modules.WIND} user={this.props.user} />
                    )
                */}
            </div>
        )
    }
}

export default Netatmo
