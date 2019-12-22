import React from 'react';
import PropTypes from "prop-types";
import cx from "classnames";
import {Colors, Card, Divider, Drawer, Position, Classes} from "@blueprintjs/core";

import NetatmoIndoorChartContainer from "../containers/NetatmoIndoorChartContainer";
import NetatmoModuleError from "./NetatmoModuleError";

import {setBatteryStatusIcon, setRadioStatusIcon, colorSelector, setWifiStatusIcon} from "../utils/tools";

/**
 * Module indoor
 */
class NetatmoModuleNAModule4 extends React.Component {
    state = {
        indoor_selected_type: 'Temperature',
        indoor_selected_color: Colors.GOLD4,
    };

    render() {
        const { data, device_id, open, handleClose } = this.props;

        return (
            <Drawer
                onClose={() => handleClose(data.type)}
                title={data.module_name}
                autoFocus={false}
                canEscapeKeyClose={false}
                canOutsideClickClose={true}
                enforceFocus={false}
                hasBackdrop={true}
                isOpen={open}
                position={Position.RIGHT}
                size={undefined}
                usePortal={true}
            >
                <div className={Classes.DRAWER_BODY}>
                    <div className={Classes.DIALOG_BODY}>
                        {
                            data.reachable ? (
                                <div className="module-details-wrapper">
                                    <h3>Last 12 hours</h3>
                                    <NetatmoIndoorChartContainer
                                        device={device_id}
                                        module={data.id}
                                        data_type={data.data_type}
                                        width={350}
                                        height={250}
                                    />

                                    <div className="values">
                                        <div className="value">
                                            <i className='wi wi-thermometer main-card-icon' style={{ color: Colors.GRAY3 }}/> <span style={{ color: Colors.GOLD4 }}>{data.data.temperature}°</span>
                                        </div>
                                        <div className="value">
                                            <i className='wi wi-humidity' style={{ color: Colors.GRAY3 }}/> <span style={{ color: Colors.BLUE5 }}>{data.data.humidity}%</span>
                                        </div>
                                        <div className="value">
                                            <i className='wi wi-cloud-refresh' style={{ color: Colors.GRAY3 }}/> <span style={{ color: Colors.GREEN5 }}>{data.data.co2}ppm</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <NetatmoModuleError data={data} />
                            )
                        }
                    </div>
                </div>
            </Drawer>
        )
    }
}

NetatmoModuleNAModule4.propTypes = {
    data: PropTypes.object.isRequired,
    device_id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default NetatmoModuleNAModule4
