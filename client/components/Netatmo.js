import React from 'react';
import PropTypes from "prop-types";
import { Button, ButtonGroup, Alignment, Drawer, Position } from "@blueprintjs/core";

import NetatmoHeader from "./NetatmoHeader";
import NetatmoModuleNAMain from "./NetatmoModuleNAMain";
import NetatmoModuleNAModule4 from "./NetatmoModuleNAModule4";
import NetatmoModuleNAModule3 from "./NetatmoModuleNAModule3";
import NetatmoModuleNAModule1 from "./NetatmoModuleNAModule1";
import NetatmoModuleNAModule2 from "./NetatmoModuleNAModule2";
import {MODULE_TYPE} from "../DTO/NetatmoStationData";

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

class Netatmo extends React.Component {
    state = {
        mainIsOpen: false,
        indoorIsOpen: false,
        outdoorIsOpen: false,
        rainIsOpen: false,
        windIsOpen: false,
    };

    componentDidMount() {
        setInterval(() => {
            this.props.fetchStationData();
        }, REFRESH_TIME);
    }

    handleModuleMainOpen = (module) => {
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

    handleClose = (module) => {
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

    render() {
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
                        Object.values(station_data.modules).map((module, index) => <Button key={index} onClick={() => this.handleModuleMainOpen(module.type)}>{module.module_name}</Button>)
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

Netatmo.propTypes = {
    loading_station_data: PropTypes.bool.isRequired,
    loading_refresh_token: PropTypes.bool.isRequired,
    station_data: PropTypes.object.isRequired,
    fetchStationData: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default Netatmo
