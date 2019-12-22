import React from 'react';
import PropTypes from "prop-types";
import cx from "classnames";
import {Classes, Colors, Drawer, Position} from "@blueprintjs/core";

import NetatmoOutdoorChartContainer from "../containers/NetatmoOutdoorChartContainer";
import NetatmoModuleError from "./NetatmoModuleError";

import { setBatteryStatusIcon, setRadioStatusIcon, colorSelector } from "../utils/tools";

/**
 * Module outdoor
 */
class NetatmoModuleNAModule1 extends React.Component {
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
                                    <NetatmoOutdoorChartContainer
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

NetatmoModuleNAModule1.propTypes = {
    data: PropTypes.object.isRequired,
    device_id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default NetatmoModuleNAModule1
