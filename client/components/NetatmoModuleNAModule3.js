import React from 'react';
import PropTypes from "prop-types";
import { Colors } from "@blueprintjs/core";

import NetatmoRainChartContainer from "../containers/NetatmoRainChartContainer";
import NetatmoModuleError from "./NetatmoModuleError";

import { setBatteryStatusIcon, setRadioStatusIcon } from "../utils/tools";

/**
 * Module rain
 */
class NetatmoModuleNAModule3 extends React.Component {
    state = {
        rain_selected_type: 'Rain',
        rain_selected_color: Colors.BLUE5
    };

    render() {
        const { data, device_id } = this.props;

        return (
            <div className='module-rain'>
                <div className="card">
                    <div className='card__header'>{data.module_name}
                        <div className='pull-right'>
                            <span className={setBatteryStatusIcon(data.battery)} style={{paddingRight: '4px'}}/>
                            <span className={setRadioStatusIcon(data.radio)}/>
                        </div>
                    </div>
                    <div className="card-body">
                        {
                            data.reachable ? (
                                <div className='row'>
                                    <div className='col1'>
                                        <div className='chart-weather-line'>
                                            <NetatmoRainChartContainer
                                                device={device_id}
                                                module={data.id}
                                                data_type={data.data_type}
                                                selected_type={this.state.rain_selected_type}
                                                color={this.state.rain_selected_color}
                                                width={160}
                                            />
                                        </div>
                                    </div>
                                    <div className='col2 weather-padding-left'>
                                        <div className='card-body-weather-content'>
                                            <div className='rain text-glow'>
                                                <i className='wi wi-raindrop main-card-icon'/> {data.data.rain ? data.data.rain.toFixed(1) : '-'}<small>mm</small>
                                            </div>
                                            <div className='rain24'><i
                                                className='wi wi-raindrop'/> {data.data.sum_rain_24 ? data.data.sum_rain_24.toFixed(1) : '-'}mm
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <NetatmoModuleError data={data} />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

NetatmoModuleNAModule3.propTypes = {
    data: PropTypes.object.isRequired,
    device_id: PropTypes.string.isRequired,
};

export default NetatmoModuleNAModule3
