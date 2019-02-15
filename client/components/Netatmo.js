import React from 'react';
import PropTypes from "prop-types";

import NetatmoNAMainChartLineContainer from '../containers/NetatmoNAMainChartLineContainer';
import NetatmoNAModule1ChartLineContainer from '../containers/NetatmoNAModule1ChartLineContainer';
import NetatmoNAModule3ChartLineContainer from '../containers/NetatmoNAModule3ChartLineContainer';
import NetatmoNAModule4ChartLineContainer from '../containers/NetatmoNAModule4ChartLineContainer';
import NetatmoTimer from './NetatmoTimer';
import NetatmoModuleError from './NetatmoModuleError';

const intervalMinutes = 1, refreshTime = intervalMinutes * 60 * 1000;

class Netatmo extends React.Component {

    componentDidMount() {
        setInterval(() => {
            this.props.fetchStationData();
        }, refreshTime);
    }

    radioStatusQuality = (value) => {
        if (value < 56) {
            return 'text-green';
        } else if (value >= 56 && value < 71) {
            return 'text-yellow';
        } else if (value >= 71) {
            return 'text-red';
        }
    };

    batteryStatusQuality = (value) => {
        if (value > 80) {
            return 'text-green';
        } else if (value <= 80 && value > 60) {
            return 'text-cyan';
        } else if (value <= 60 && value > 40) {
            return 'text-blue';
        } else if (value <= 40 && value > 20) {
            return 'text-yellow';
        } else if (value <= 20) {
            return 'text-red';
        }
    };

    render() {
        return (
            <div className='full-page'>
                <div className='content__header'>
                    <h2>{this.props.station_data.station_name} <small>{this.props.station_data.place.city} - {this.props.station_data.place.altitude}m</small></h2>
                    <div className="actions actions-weather">
                        <NetatmoTimer last_status_store={this.props.station_data.last_status_store} locale={this.props.locale}/>
                    </div>
                </div>

                <div style={{height: '100%'}}>
                    {/* Main Station*/}
                    <div className='module-main'>
                        <div className="card">
                            <div className='card__header'>{this.props.station_data.module_name}
                                <div className='pull-right'>
                                    <span className={this.radioStatusQuality(this.props.station_data.wifi_status)}><i className="zmdi zmdi-wifi-alt"/></span>
                                </div>
                            </div>
                            <div className="card-body">
                                {
                                    this.props.station_data.reachable ? (
                                        <div className='row'>
                                            <div className='col1'>
                                                <div className='chart-weather-line'>
                                                    <NetatmoNAMainChartLineContainer
                                                        device={this.props.station_data.id}
                                                        module={this.props.station_data.id}
                                                        type='temperature'
                                                        color='#ffa000'
                                                        offsetMin={2}
                                                        offsetMax={2}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col2 weather-padding-left'>
                                                <div className='card-body-weather-content'>
                                                    <div className='temperature'><i
                                                        className='wi wi-thermometer'/> {Math.round(this.props.station_data.data.temperature)}°
                                                    </div>
                                                    <div className='hpa'><i className='wi wi-barometer'/> {Math.round(this.props.station_data.data.pressure)}{this.props.user.pressure_unit}</div>
                                                    <div className='humidity'><i className='wi wi-humidity'/> {this.props.station_data.data.humidity}%</div>
                                                    <div className='noise'><i className='wi wi-earthquake'/> {this.props.station_data.data.noise}dB</div>
                                                    <div className='co2'><i className='wi wi-cloud-refresh'/> {this.props.station_data.data.co2}ppm</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <NetatmoModuleError data={this.props.station_data} />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Module 4 - internal */}
                    {
                        this.props.station_data.available_modules.INDOOR && (
                            <div className='module-internal'>
                                <div className="card">
                                    <div className='card__header'>{this.props.station_data.modules.INDOOR.module_name}
                                        <div className='pull-right'>
                                                    <span className={this.batteryStatusQuality(this.props.station_data.modules.INDOOR.battery_percent)}>
                                                        <i className="zmdi zmdi-battery-flash"/>
                                                    </span>{' '}
                                            <span className='battery-percent'>{this.props.station_data.modules.INDOOR.battery_percent}%</span>
                                            <span className={this.radioStatusQuality(this.props.station_data.modules.INDOOR.rf_status)}>
                                                        <i className="zmdi zmdi-portable-wifi"/>
                                                    </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.props.station_data.modules.INDOOR.reachable ? (
                                                <div className='row'>
                                                    <div className='col1'>
                                                        <div className='chart-weather-line'>
                                                            <NetatmoNAModule4ChartLineContainer
                                                                device={this.props.station_data.id}
                                                                module={this.props.station_data.modules.INDOOR.id}
                                                                type='temperature'
                                                                color='#ffa000'
                                                                offsetMin={2}
                                                                offsetMax={2}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col2 weather-padding-left'>
                                                        <div className='card-body-weather-content'>
                                                            <div className='temperature'><i
                                                                className='wi wi-thermometer'/> {Math.round(this.props.station_data.modules.INDOOR.data.temperature)}°
                                                            </div>
                                                            <div className='humidity'><i className='wi wi-humidity'/> {this.props.station_data.modules.INDOOR.data.humidity}%</div>
                                                            <div className='co2'><i className='wi wi-cloud-refresh'/> {this.props.station_data.modules.INDOOR.data.co2}ppm</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <NetatmoModuleError data={this.props.station_data.modules.INDOOR} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* Module 3 - rain */}
                    {
                        this.props.station_data.available_modules.RAIN && (
                            <div className='module-rain'>
                                <div className="card">
                                    <div className='card__header'>{this.props.station_data.modules.RAIN.module_name}
                                        <div className='pull-right'>
                                                    <span className={this.batteryStatusQuality(this.props.station_data.modules.RAIN.battery_percent)}>
                                                        <i className="zmdi zmdi-battery-flash"/>
                                                    </span>{' '}
                                            <span className='battery-percent'>{this.props.station_data.modules.RAIN.battery_percent}%</span>
                                            <span className={this.radioStatusQuality(this.props.station_data.modules.RAIN.rf_status)}>
                                                        <i className="zmdi zmdi-portable-wifi"/>
                                                    </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.props.station_data.modules.RAIN.reachable ? (
                                                <div className='row'>
                                                    <div className='col1'>
                                                        <div className='chart-weather-line'>
                                                            <NetatmoNAModule3ChartLineContainer
                                                                device={this.props.station_data.id}
                                                                module={this.props.station_data.modules.RAIN.id}
                                                                type='rain'
                                                                color='#1e88e5'
                                                                offsetMin={0}
                                                                offsetMax={0.1}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col2 weather-padding-left'>
                                                        <div className='card-body-weather-content'>
                                                            <div className='rain'><i className='wi wi-raindrop'/> {this.props.station_data.modules.RAIN.data.rain.toFixed(1)}
                                                                <small>mm</small>
                                                            </div>
                                                            <div className='rain24'><i
                                                                className='wi wi-raindrop'/> {this.props.station_data.modules.RAIN.data.sum_rain_24.toFixed(1)}mm
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <NetatmoModuleError data={this.props.station_data.modules.RAIN} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* Module 1 - external */}
                    {
                        this.props.station_data.available_modules.OUTDOOR && (
                            <div className='module-external'>
                                <div className="card">
                                    <div className='card__header'>{this.props.station_data.modules.OUTDOOR.module_name}
                                        <div className='pull-right'>
                                                    <span className={this.batteryStatusQuality(this.props.station_data.modules.OUTDOOR.battery_percent)}>
                                                        <i className="zmdi zmdi-battery-flash"/>
                                                    </span>{' '}
                                            <span className='battery-percent'>{this.props.station_data.modules.OUTDOOR.battery_percent}%</span>
                                            <span className={this.radioStatusQuality(this.props.station_data.modules.OUTDOOR.rf_status)}>
                                                        <i className="zmdi zmdi-portable-wifi"/>
                                                    </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.props.station_data.modules.OUTDOOR.reachable ? (
                                                <div className='row'>
                                                    <div className='col1'>
                                                        <div className='chart-weather-line'>
                                                            <NetatmoNAModule1ChartLineContainer
                                                                device={this.props.station_data.id}
                                                                module={this.props.station_data.modules.INDOOR.id}
                                                                type='temperature'
                                                                color='#ffa000'
                                                                offsetMin={2}
                                                                offsetMax={2}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col2 weather-padding-left'>
                                                        <div className='card-body-weather-content'>
                                                            <div className='temperature'><i
                                                                className='wi wi-thermometer'/> {Math.round(this.props.station_data.modules.OUTDOOR.data.temperature)}°
                                                            </div>
                                                            <div className='humidity'><i className='wi wi-humidity'/> {this.props.station_data.modules.OUTDOOR.data.humidity}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <NetatmoModuleError data={this.props.station_data.modules.OUTDOOR} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }


                    {/* Module 4 - wind */}
                    {
                        this.props.station_data.available_modules.WIND && (
                            <div className='module-wind'>
                                <div className="card">
                                    <div className='card__header'>{this.props.station_data.modules.WIND.module_name}
                                        <div className='pull-right'>
                                                    <span className={this.batteryStatusQuality(this.props.station_data.modules.WIND.battery_percent)}>
                                                        <i className="zmdi zmdi-battery-flash"/>
                                                    </span>{' '}<span className='battery-percent'>{this.props.station_data.modules.WIND.battery_percent}%</span>
                                            <span className={this.radioStatusQuality(this.props.station_data.modules.WIND.rf_status)}>
                                                        <i className="zmdi zmdi-portable-wifi"/>
                                                    </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.props.station_data.modules.WIND.reachable ? (
                                                <div className='row'>
                                                    <div className='col1'>
                                                        <div className='chart-weather-line'>
                                                            <i className={'wind-icon wi wi-wind from-' + this.props.station_data.modules.WIND.data.wind_angle + '-deg'}/>
                                                        </div>
                                                    </div>
                                                    <div className='col2 weather-padding-left'>
                                                        <div className='card-body-weather-content'>
                                                            <div className='temperature'><i
                                                                className='wi wi-small-craft-advisory'/> {this.props.station_data.modules.WIND.data.wind_strength}{this.props.user.windunit}
                                                            </div>
                                                            <div className='humidity'><i className='wi wi-strong-wind'/> {this.props.station_data.modules.WIND.data.gust_strength}{this.props.user.windunit}
                                                            </div>
                                                            <div className='co2'><i className='wi wi-wind-direction'/> {this.props.station_data.modules.WIND.data.max_wind_str}{this.props.user.windunit}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <NetatmoModuleError data={this.props.station_data.modules.WIND} />
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
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
