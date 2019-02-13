import React from 'react';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";

import NetatmoNAMainChartLineContainer from '../containers/NetatmoNAMainChartLineContainer';
import NetatmoNAModule1ChartLineContainer from '../containers/NetatmoNAModule1ChartLineContainer';
import NetatmoNAModule2ChartLineContainer from '../containers/NetatmoNAModule2ChartLineContainer';
import NetatmoNAModule4ChartLineContainer from '../containers/NetatmoNAModule4ChartLineContainer';
import NetatmoTimer from './NetatmoTimer';
import NetatmoModuleError from './NetatmoModuleError';

const intervalMinutes = 10, refreshTime = intervalMinutes * 60 * 1000;
const cssAnimationDuration = 200;

class Netatmo extends React.Component {
    constructor(props) {
        super(props);

        console.log('Fetch Netatmo Station Data');
        this.props.fetchStationData();
    }

    state = {
        enterTitle: false,
        enterModuleMain: false,
        enterModuleInternal: false,
        enterModuleRain: false,
        enterModuleExternal: false,
        enterModuleWind: false
    };

    componentDidMount() {
        setInterval(() => {
            this.props.fetchStationData();
        }, refreshTime);

        setTimeout(() => {
            this.setState({enterTitle: true});
            setTimeout(() => {
                this.setState({enterModuleMain: true});
                setTimeout(() => {
                    this.setState({enterModuleInternal: true});
                    setTimeout(() => {
                        this.setState({enterModuleRain: true});
                        setTimeout(() => {
                            this.setState({enterModuleExternal: true});
                            setTimeout(() => {
                                this.setState({enterModuleWind: true})
                            }, cssAnimationDuration);
                        }, cssAnimationDuration);
                    }, cssAnimationDuration);
                }, cssAnimationDuration);
            }, cssAnimationDuration);
        }, 2000);
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
        if (!this.props.loading_station_data) {
            return (
                <div className='full-page'>
                    <CSSTransition in={this.state.enterTitle} classNames='fade' timeout={cssAnimationDuration}>
                        <div className='content__header fade-enter'>
                            <h2>{this.props.station_data.station_name} <small>{this.props.station_data.place.city} - {this.props.station_data.place.altitude}m</small></h2>
                            <div className="actions actions-weather">
                                <NetatmoTimer last_status_store={this.props.station_data.last_status_store} locale={this.props.locale}/>
                            </div>
                        </div>
                    </CSSTransition>

                    <div style={{height: '100%'}}>
                        {/* Main Station*/}
                        <CSSTransition in={this.state.enterModuleMain} classNames='fade' timeout={cssAnimationDuration}>
                            <div className='module-main fade-enter'>
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
                                                            <div className='hpa'><i className='wi wi-barometer'/> {Math.round(this.props.station_data.data.pressure)}mBar</div>
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
                        </CSSTransition>

                        {/* Module 2 - internal */}
                        {
                            this.props.station_data.available_modules.INDOOR && (
                                <CSSTransition in={this.state.enterModuleInternal} classNames='fade' timeout={cssAnimationDuration}>
                                    <div className='module-internal fade-enter'>
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
                                </CSSTransition>
                            )
                        }

                        {/* Module 3 - rain */}
                        {
                            this.props.station_data.available_modules.RAIN && (
                                <CSSTransition in={this.state.enterModuleRain} classNames='fade' timeout={cssAnimationDuration}>
                                    <div className='module-rain fade-enter'>
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
                                                                    <NetatmoNAModule2ChartLineContainer
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
                                </CSSTransition>
                            )
                        }

                        {/* Module 1 - external */}
                        {
                            this.props.station_data.available_modules.OUTDOOR && (
                                <CSSTransition in={this.state.enterModuleExternal} classNames='fade' timeout={cssAnimationDuration}>
                                    <div className='module-external fade-enter'>
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
                                </CSSTransition>
                            )
                        }


                        {/* Module 4 - wind */}
                        {
                            this.props.station_data.available_modules.WIND && (
                                <CSSTransition in={this.state.enterModuleWind} classNames='fade' timeout={cssAnimationDuration}>
                                    <div className='module-wind fade-enter'>
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
                                                                        className='wi wi-small-craft-advisory'/> {this.props.station_data.modules.WIND.data.wind_strength}km/h
                                                                    </div>
                                                                    <div className='humidity'><i className='wi wi-strong-wind'/> {this.props.station_data.modules.WIND.gust_strength}km/h
                                                                    </div>
                                                                    <div className='co2'><i className='wi wi-wind-direction'/> {this.props.station_data.modules.WIND.data.max_wind_str}km/h
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
                                </CSSTransition>
                            )
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div className='loading'>
                    Loading....
                </div>
            )
        }
    }
}

Netatmo.propTypes = {
    loading_station_data: PropTypes.bool.isRequired,
    loading_refresh_token: PropTypes.bool.isRequired,
    station_data: PropTypes.object.isRequired,
    isFetchingNAMain: PropTypes.bool,
    isFetchingNAModule1: PropTypes.bool,
    isFetchingNAModule2: PropTypes.bool,
    isFetchingNAModule3: PropTypes.bool,
    isFetchingNAModule4: PropTypes.bool,
    fetchStationData: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
};

export default Netatmo
