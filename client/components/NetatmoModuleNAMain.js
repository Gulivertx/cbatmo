import React from 'react';
import PropTypes from "prop-types";
import { Colors, Classes, Drawer, Position } from "@blueprintjs/core";

import NetatmoMainModuleChartContainer from "../containers/NetatmoMainModuleChartContainer";
import NetatmoModuleError from "./NetatmoModuleError";

import { setWifiStatusIcon } from "../utils/tools";

/**
 * Main station
 */
class NetatmoModuleNAMain extends React.Component {
    render() {
        const { data, user, open, handleClose } = this.props;

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
                                    <NetatmoMainModuleChartContainer
                                        device={data.id}
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
                                            <i className='wi wi-barometer' style={{ color: Colors.GRAY3 }}/> <span style={{ color: Colors.COBALT5 }}>{Math.round(data.data.pressure)}{user.pressure_unit}</span>
                                        </div>
                                        <div className="value">
                                            <i className='wi wi-humidity' style={{ color: Colors.GRAY3 }}/> <span style={{ color: Colors.BLUE5 }}>{data.data.humidity}%</span>
                                        </div>
                                        <div className="value">
                                            <i className='wi wi-earthquake' style={{ color: Colors.GRAY3 }}/> <span style={{ color: Colors.RED5 }}>{data.data.noise}dB</span>
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

NetatmoModuleNAMain.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default NetatmoModuleNAMain
