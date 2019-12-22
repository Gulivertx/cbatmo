import React from 'react';
import PropTypes from "prop-types";

import NetatmoModuleError from "./NetatmoModuleError";

import { setBatteryStatusIcon, setRadioStatusIcon } from "../utils/tools";

/**
 * Module wind
 */
class NetatmoModuleNAModule1 extends React.Component {

    render() {
        const { data, user } = this.props;

        return (
            <div className='module-wind'>
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
                                            <i className={'wind-icon wi wi-wind from-' + data.data.wind_angle + '-deg'}/>
                                        </div>
                                    </div>
                                    <div className='col2 weather-padding-left'>
                                        <div className='card-body-weather-content'>
                                            <div className='temperature text-glow'>
                                                <i className='wi wi-small-craft-advisory main-card-icon'/> {data.data.wind_strength}{user.windunit}
                                            </div>
                                            <div className='humidity'><i className='wi wi-strong-wind'/> {data.data.gust_strength}{user.windunit}
                                            </div>
                                            <div className='co2'><i className='wi wi-wind-direction'/> {data.data.max_wind_str}{user.windunit}
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

NetatmoModuleNAModule1.propTypes = {
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default NetatmoModuleNAModule1
