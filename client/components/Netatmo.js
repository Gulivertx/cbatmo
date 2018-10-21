import React from 'react';
import PropTypes from "prop-types";
import {CSSTransition} from "react-transition-group";

import NetatmoNAMainChartLineContainer from '../containers/NetatmoNAMainChartLineContainer';
import NetatmoNAModule1ChartLineContainer from '../containers/NetatmoNAModule1ChartLineContainer';
import NetatmoNAModule2ChartLineContainer from '../containers/NetatmoNAModule2ChartLineContainer';
import NetatmoNAModule4ChartLineContainer from '../containers/NetatmoNAModule4ChartLineContainer';
import NetatmoTimer from './NetatmoTimer';
import ErrorBoundary from './ErrorBoundary';

const intervalMinutes = 10, refreshTime = intervalMinutes * 60 * 1000;
const cssAnimationDuration = 200;

class Netatmo extends React.Component {
    constructor(props) {
        super(props);

        this.props.fetchNetatmoStationData();
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
        this.interval = setInterval(() => {
            this.props.fetchNetatmoStationData();
        }, refreshTime);

        setTimeout(() => {
            this.setState({enterTitle:true});
            setTimeout(() => {
                this.setState({enterModuleMain:true})
                setTimeout(() => {
                    this.setState({enterModuleInternal:true})
                    setTimeout(() => {
                        this.setState({enterModuleRain:true})
                        setTimeout(() => {
                            this.setState({enterModuleExternal:true})
                            setTimeout(() => {
                                this.setState({enterModuleWind:true})
                            }, cssAnimationDuration);
                        }, cssAnimationDuration);
                    }, cssAnimationDuration);
                }, cssAnimationDuration);
            }, cssAnimationDuration);
        },1000);
    }

    /*componentWillUnmount() {
        clearInterval(this.interval);
    }*/

    radioStatusQuality = (value) => {
        if (value < 56) {
            return 'text-green';
        } else if (value >= 56 && value <71) {
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
        if (!this.props.isFirstFetch) {
            return (
                <ErrorBoundary>
                    <div className='full-page'>
                        <CSSTransition in={this.state.enterTitle} classNames='fade' timeout={cssAnimationDuration}>
                            <div className='content__header fade-enter'>
                                <h2>{this.props.stationData.station_name} <small>{this.props.stationData.place.city} - {this.props.stationData.place.altitude}m</small></h2>
                                <div className="actions actions-weather">
                                    <NetatmoTimer last_status_store={this.props.stationData.last_status_store} />
                                </div>
                            </div>
                        </CSSTransition>

                        <div style={{height: '100%'}}>

                            {/* Main Station*/}
                            <CSSTransition in={this.state.enterModuleMain} classNames='fade' timeout={cssAnimationDuration}>
                                <div className='module-main fade-enter'>
                                    <div className="card">
                                        <div className='card__header'>{this.props.stationData.module_name}
                                            <div className='pull-right'>
                                                <span className={this.radioStatusQuality(this.props.stationData.wifi_status)}><i className="zmdi zmdi-wifi-alt"/></span>
                                            </div>
                                            {/*<div className="actions">
                                    <a><i className='wi wi-thermometer action-wi'/></a>
                                    <a><i className="wi wi-humidity action-wi"/></a>
                                    <a><i className="wi wi-barometer action-wir"/></a>
                                    <a><i className="wi wi-earthquake action-wi"/></a>
                                    <a><i className="wi wi-cloud-refresh action-wi"/></a>
                                </div>*/}
                                        </div>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col1'>
                                                    <div className='chart-weather-line'>
                                                        <NetatmoNAMainChartLineContainer
                                                            device={this.props.stationData._id}
                                                            module={this.props.stationData._id}
                                                            type='temperature'
                                                            color='#ffa000'
                                                            offsetMin={2}
                                                            offsetMax={2}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col2 weather-padding-left'>
                                                    <div className='card-body-weather-content'>
                                                        <div className='temperature'><i className='wi wi-thermometer'/> {Math.round(this.props.stationData.dashboard_data.Temperature)}°</div>
                                                        <div className='hpa'><i className='wi wi-barometer'/> {Math.round(this.props.stationData.dashboard_data.Pressure)}mBar</div>
                                                        <div className='humidity'><i className='wi wi-humidity'/> {this.props.stationData.dashboard_data.Humidity}%</div>
                                                        <div className='noise'><i className='wi wi-earthquake'/> {this.props.stationData.dashboard_data.Noise}dB</div>
                                                        <div className='co2'><i className='wi wi-cloud-refresh'/> {this.props.stationData.dashboard_data.CO2}ppm</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>

                            {/* Module 2 - internal */}
                            <CSSTransition in={this.state.enterModuleInternal} classNames='fade' timeout={cssAnimationDuration}>
                                <div className='module-internal fade-enter'>
                                    <div className="card">
                                        <div className='card__header'>{this.props.stationData.modules[1].module_name}
                                            <div className='pull-right'>
                                                <span className={this.batteryStatusQuality(this.props.stationData.modules[1].battery_percent)}><i className="zmdi zmdi-battery-flash"/></span> <span className='battery-percent'>{this.props.stationData.modules[1].battery_percent}%</span>
                                                <span className={this.radioStatusQuality(this.props.stationData.modules[1].rf_status)}><i className="zmdi zmdi-portable-wifi"/></span>
                                            </div>
                                            {/*<div className="actions">
                                    <a><i className='wi wi-thermometer action-wi'/></a>
                                    <a><i className="wi wi-humidity action-wi"/></a>
                                    <a><i className="wi wi-cloud-refresh action-wi"/></a>
                                </div>*/}
                                        </div>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col1'>
                                                    <div className='chart-weather-line'>
                                                        <NetatmoNAModule4ChartLineContainer
                                                            device={this.props.stationData._id}
                                                            module={this.props.stationData.modules[1]._id}
                                                            type='temperature'
                                                            color='#ffa000'
                                                            offsetMin={2}
                                                            offsetMax={2}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col2 weather-padding-left'>
                                                    <div className='card-body-weather-content'>
                                                        <div className='temperature'><i className='wi wi-thermometer'/> {Math.round(this.props.stationData.modules[1].dashboard_data.Temperature)}°</div>
                                                        <div className='humidity'><i className='wi wi-humidity'/> {this.props.stationData.modules[1].dashboard_data.Humidity}%</div>
                                                        <div className='co2'><i className='wi wi-cloud-refresh'/> {this.props.stationData.modules[1].dashboard_data.CO2}ppm</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>


                            {/* Module 3 - rain */}
                            <CSSTransition in={this.state.enterModuleRain} classNames='fade' timeout={cssAnimationDuration}>
                                <div className='module-rain fade-enter'>
                                    <div className="card">
                                        <div className='card__header'>{this.props.stationData.modules[2].module_name}
                                            <div className='pull-right'>
                                                <span className={this.batteryStatusQuality(this.props.stationData.modules[2].battery_percent)}><i className="zmdi zmdi-battery-flash"/></span> <span className='battery-percent'>{this.props.stationData.modules[2].battery_percent}%</span>
                                                <span className={this.radioStatusQuality(this.props.stationData.modules[2].rf_status)}><i className="zmdi zmdi-portable-wifi"/></span>
                                            </div>
                                            {/*<div className="actions">
                                    <a><i className='wi wi-thermometer action-wi'/></a>
                                    <a><i className="wi wi-humidity action-wi"/></a>
                                    <a><i className="wi wi-cloud-refresh action-wi"/></a>
                                </div>*/}
                                        </div>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col1'>
                                                    <div className='chart-weather-line'>
                                                        <NetatmoNAModule2ChartLineContainer
                                                            device={this.props.stationData._id}
                                                            module={this.props.stationData.modules[2]._id}
                                                            type='rain'
                                                            color='#1e88e5'
                                                            offsetMin={0}
                                                            offsetMax={0.1}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col2 weather-padding-left'>
                                                    <div className='card-body-weather-content'>
                                                        <div className='rain'><i className='wi wi-raindrop'/> {this.props.stationData.modules[2].dashboard_data.Rain.toFixed(1)}<small>mm</small></div>
                                                        <div className='rain24'><i className='wi wi-raindrop'/> {this.props.stationData.modules[2].dashboard_data.sum_rain_24.toFixed(1)}mm</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>


                            {/* Module 1 - external */}
                            <CSSTransition in={this.state.enterModuleExternal} classNames='fade' timeout={cssAnimationDuration}>
                                <div className='module-external fade-enter'>
                                    <div className="card">
                                        <div className='card__header'>{this.props.stationData.modules[0].module_name}
                                            <div className='pull-right'>
                                                <span className={this.batteryStatusQuality(this.props.stationData.modules[0].battery_percent)}><i className="zmdi zmdi-battery-flash"/></span> <span className='battery-percent'>{this.props.stationData.modules[0].battery_percent}%</span>
                                                <span className={this.radioStatusQuality(this.props.stationData.modules[0].rf_status)}><i className="zmdi zmdi-portable-wifi"/></span>
                                            </div>
                                            {/*<div className="actions">
                                    <a><i className='wi wi-thermometer action-wi'/></a>
                                    <a><i className="wi wi-humidity action-wi"/></a>
                                </div>*/}
                                        </div>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col1'>
                                                    <div className='chart-weather-line'>
                                                        <NetatmoNAModule1ChartLineContainer
                                                            device={this.props.stationData._id}
                                                            module={this.props.stationData.modules[0]._id}
                                                            type='temperature'
                                                            color='#ffa000'
                                                            offsetMin={2}
                                                            offsetMax={2}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col2 weather-padding-left'>
                                                    <div className='card-body-weather-content'>
                                                        <div className='temperature'><i className='wi wi-thermometer'/> {Math.round(this.props.stationData.modules[0].dashboard_data.Temperature)}°</div>
                                                        <div className='humidity'><i className='wi wi-humidity'/> {this.props.stationData.modules[0].dashboard_data.Humidity}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>


                            {/* Module 4 - wind */}
                            <CSSTransition in={this.state.enterModuleWind} classNames='fade' timeout={cssAnimationDuration}>
                                <div className='module-wind fade-enter'>
                                    <div className="card">
                                        <div className='card__header'>{this.props.stationData.modules[3].module_name}
                                            <div className='pull-right'>
                                                <span className={this.batteryStatusQuality(this.props.stationData.modules[3].battery_percent)}><i className="zmdi zmdi-battery-flash"/></span> <span className='battery-percent'>{this.props.stationData.modules[3].battery_percent}%</span>
                                                <span className={this.radioStatusQuality(this.props.stationData.modules[3].rf_status)}><i className="zmdi zmdi-portable-wifi"/></span>
                                            </div>
                                            {/*<div className="actions">
                                    <a><i className='wi wi-thermometer action-wi'/></a>
                                    <a><i className="wi wi-humidity action-wi"/></a>
                                    <a><i className="wi wi-cloud-refresh action-wi"/></a>
                                </div>*/}
                                        </div>
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col1'>
                                                    <div className='chart-weather-line'>
                                                        <i className={'wind-icon wi wi-wind from-' + this.props.stationData.modules[3].dashboard_data.WindAngle + '-deg'}/>
                                                    </div>
                                                </div>
                                                <div className='col2 weather-padding-left'>
                                                    <div className='card-body-weather-content'>
                                                        <div className='temperature'><i className='wi wi-small-craft-advisory'/> {this.props.stationData.modules[3].dashboard_data.WindStrength}km/h</div>
                                                        <div className='humidity'><i className='wi wi-strong-wind'/> {this.props.stationData.modules[3].dashboard_data.GustStrength}km/h</div>
                                                        <div className='co2'><i className='wi wi-wind-direction'/> {this.props.stationData.modules[3].dashboard_data.max_wind_str}km/h</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>

                        </div>
                    </div>
                </ErrorBoundary>
            )
        } else {
            return (
                <div className='loading'>Loading....</div>
            )
        }
    }
}

Netatmo.propTypes = {
    isFirstFetch: PropTypes.bool,
    isFetchingRefreshToken: PropTypes.bool,
    isFetchingStation: PropTypes.bool,
    isFetchingNAMain: PropTypes.bool,
    isFetchingNAModule1: PropTypes.bool,
    isFetchingNAModule2: PropTypes.bool,
    isFetchingNAModule3: PropTypes.bool,
    isFetchingNAModule4: PropTypes.bool,
    stationData: PropTypes.object,
    fetchNetatmoStationData: PropTypes.func
};

export default Netatmo
