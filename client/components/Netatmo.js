import React from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';

import NetatmoMainModuleChartContainer from '../containers/NetatmoMainModuleChartContainer';
import NetatmoOutdoorChartContainer from '../containers/NetatmoOutdoorChartContainer';
import NetatmoRainChartContainer from '../containers/NetatmoRainChartContainer';
import NetatmoIndoorChartContainer from '../containers/NetatmoIndoorChartContainer';
import NetatmoTimer from './NetatmoTimer';
import NetatmoModuleError from './NetatmoModuleError';

const intervalMinutes = 1, refreshTime = intervalMinutes * 60 * 1000;

class Netatmo extends React.Component {
    state = {
        main_selected_type: 'Temperature',
        main_selected_color: '#f9a825',
        indoor_selected_type: 'Temperature',
        indoor_selected_color: '#f9a825',
        outdoor_selected_type: 'Temperature',
        outdoor_selected_color: '#f9a825',
        rain_selected_type: 'Rain',
        rain_selected_color: '#1e88e5'
    };

    componentDidMount() {
        setInterval(() => {
            this.props.fetchStationData();
        }, refreshTime);
    }

    colorSelector = (color) => {
        switch (color) {
            case 'yellow':
                color = '#f9a825';
                break;
            case 'blue':
                color = '#1e88e5';
                break;
            case 'red':
                color = '#ef5350';
                break;
            case 'purpule':
                color = '#e91e63';
                break;
            case 'green':
                color = '#4caf50';
                break;
            case 'cyan':
                color = '#00bcd4';
                break;
            case 'white':
                color = '#c2cbce';
                break;
        }

        return color;
    };

    setWifiStatusIcon = (status) => {
        switch (status) {
            case 'bad':
                return 'header-icon mdi mdi-wifi-strength-1';
            case 'average':
                return 'header-icon mdi mdi-wifi-strength-2';
            case 'good':
                return 'header-icon mdi mdi-wifi-strength-4'
        }
    };

    setRadioStatusIcon = (status) => {
        switch (status) {
            case 'very-low':
                return 'header-icon mdi mdi-network-strength-1';
            case 'low':
                return 'header-icon mdi mdi-network-strength-2';
            case 'medium':
                return 'header-icon mdi mdi-network-strength-3';
            case 'high':
                return 'header-icon mdi mdi-network-strength-4';
        }
    };

    setBatteryStatusIcon = (status) => {
        switch (status) {
            case 'very-low':
                return 'header-icon mdi mdi-battery-10';
            case 'low':
                return 'header-icon mdi mdi-battery-30';
            case 'medium':
                return 'header-icon mdi mdi-battery-50';
            case 'high':
                return 'header-icon mdi mdi-battery-70';
            case 'full':
                return 'header-icon mdi mdi-battery-90';
            case 'max':
                return 'header-icon mdi mdi-battery';

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
                                    <span className={this.setWifiStatusIcon(this.props.station_data.wifi)} />
                                </div>
                            </div>
                            <div className="card-body">
                                {
                                    this.props.station_data.reachable ? (
                                        <div className='row'>
                                            <div className='col1'>
                                                <div className='chart-weather-line'>
                                                    <NetatmoMainModuleChartContainer
                                                        device={this.props.station_data.id}
                                                        module={this.props.station_data.id}
                                                        data_type={this.props.station_data.data_type}
                                                        selected_type={this.state.main_selected_type}
                                                        color={this.state.main_selected_color}
                                                        width={490}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col2 weather-padding-left'>
                                                <div className='card-body-weather-content'>
                                                    <div className='temperature' onClick={() => this.setState({
                                                        main_selected_type: this.props.station_data.data_type[0],
                                                        main_selected_color: this.colorSelector('yellow')
                                                    })}>
                                                        <i className='wi wi-thermometer main-card-icon'/> <span className={cx(this.state.main_selected_type === this.props.station_data.data_type[0] && 'text-glow')}>{this.props.station_data.data.temperature}°</span>
                                                    </div>
                                                    <div className='hpa' onClick={() => this.setState({
                                                        main_selected_type: this.props.station_data.data_type[4],
                                                        main_selected_color: this.colorSelector('green')
                                                    })}>
                                                        <i className='wi wi-barometer'/> <span className={cx(this.state.main_selected_type === this.props.station_data.data_type[4] && 'text-glow')}>{Math.round(this.props.station_data.data.pressure)}{this.props.user.pressure_unit}</span>
                                                    </div>
                                                    <div className='humidity' onClick={() => this.setState({
                                                        main_selected_type: this.props.station_data.data_type[2],
                                                        main_selected_color: this.colorSelector('blue')
                                                    })}>
                                                        <i className='wi wi-humidity'/> <span className={cx(this.state.main_selected_type === this.props.station_data.data_type[2] && 'text-glow')}>{this.props.station_data.data.humidity}%</span>
                                                    </div>
                                                    <div className='noise' onClick={() => this.setState({
                                                        main_selected_type: this.props.station_data.data_type[3],
                                                        main_selected_color: this.colorSelector('purpule')
                                                    })}>
                                                        <i className='wi wi-earthquake'/> <span className={cx(this.state.main_selected_type === this.props.station_data.data_type[3] && 'text-glow')}>{this.props.station_data.data.noise}dB</span>
                                                    </div>
                                                    <div className='co2' onClick={() => this.setState({
                                                        main_selected_type: this.props.station_data.data_type[1],
                                                        main_selected_color: this.colorSelector('cyan')
                                                    })}>
                                                        <i className='wi wi-cloud-refresh'/> <span className={cx(this.state.main_selected_type === this.props.station_data.data_type[1] && 'text-glow')}>{this.props.station_data.data.co2}ppm</span>
                                                    </div>
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
                                            <span className={this.setBatteryStatusIcon(this.props.station_data.modules.INDOOR.battery)} style={{paddingRight: '4px'}}/>
                                            <span className={this.setRadioStatusIcon(this.props.station_data.modules.INDOOR.radio)}/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.props.station_data.modules.INDOOR.reachable ? (
                                                <div className='row'>
                                                    <div className='col1'>
                                                        <div className='chart-weather-line'>
                                                            <NetatmoIndoorChartContainer
                                                                device={this.props.station_data.id}
                                                                module={this.props.station_data.modules.INDOOR.id}
                                                                data_type={this.props.station_data.modules.INDOOR.data_type}
                                                                selected_type={this.state.indoor_selected_type}
                                                                color={this.state.indoor_selected_color}
                                                                width={250}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col2 weather-padding-left'>
                                                        <div className='card-body-weather-content'>
                                                            <div className='temperature' onClick={() => this.setState({
                                                                indoor_selected_type: this.props.station_data.modules.INDOOR.data_type[0],
                                                                indoor_selected_color: this.colorSelector('yellow')
                                                            })}>
                                                                <i className='wi wi-thermometer main-card-icon'/> <span className={cx(this.state.indoor_selected_type === this.props.station_data.modules.INDOOR.data_type[0] && 'text-glow')}>{this.props.station_data.modules.INDOOR.data.temperature}°</span>
                                                            </div>
                                                            <div className='humidity' onClick={() => this.setState({
                                                                indoor_selected_type: this.props.station_data.modules.INDOOR.data_type[2],
                                                                indoor_selected_color: this.colorSelector('blue')
                                                            })}>
                                                                <i className='wi wi-humidity'/> <span className={cx(this.state.indoor_selected_type === this.props.station_data.modules.INDOOR.data_type[2] && 'text-glow')}>{this.props.station_data.modules.INDOOR.data.humidity}%</span>
                                                            </div>
                                                            <div className='co2' onClick={() => this.setState({
                                                                indoor_selected_type: this.props.station_data.modules.INDOOR.data_type[1],
                                                                indoor_selected_color: this.colorSelector('cyan')
                                                            })}>
                                                                <i className='wi wi-cloud-refresh'/> <span className={cx(this.state.indoor_selected_type === this.props.station_data.modules.INDOOR.data_type[1] && 'text-glow')}>{this.props.station_data.modules.INDOOR.data.co2}ppm</span>
                                                            </div>
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
                                            <span className={this.setBatteryStatusIcon(this.props.station_data.modules.RAIN.battery)} style={{paddingRight: '4px'}}/>
                                            <span className={this.setRadioStatusIcon(this.props.station_data.modules.RAIN.radio)}/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.props.station_data.modules.RAIN.reachable ? (
                                                <div className='row'>
                                                    <div className='col1'>
                                                        <div className='chart-weather-line'>
                                                            <NetatmoRainChartContainer
                                                                device={this.props.station_data.id}
                                                                module={this.props.station_data.modules.RAIN.id}
                                                                data_type={this.props.station_data.modules.RAIN.data_type}
                                                                selected_type={this.state.rain_selected_type}
                                                                color={this.state.rain_selected_color}
                                                                width={160}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col2 weather-padding-left'>
                                                        <div className='card-body-weather-content'>
                                                            <div className='rain text-glow'>
                                                                <i className='wi wi-raindrop main-card-icon'/> {this.props.station_data.modules.RAIN.data.rain.toFixed(1)}<small>mm</small>
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
                                            <span className={this.setBatteryStatusIcon(this.props.station_data.modules.OUTDOOR.battery)} style={{paddingRight: '4px'}}/>
                                            <span className={this.setRadioStatusIcon(this.props.station_data.modules.OUTDOOR.radio)}/>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            this.props.station_data.modules.OUTDOOR.reachable ? (
                                                <div className='row'>
                                                    <div className='col1'>
                                                        <div className='chart-weather-line'>
                                                            <NetatmoOutdoorChartContainer
                                                                device={this.props.station_data.id}
                                                                module={this.props.station_data.modules.OUTDOOR.id}
                                                                data_type={this.props.station_data.modules.OUTDOOR.data_type}
                                                                selected_type={this.state.outdoor_selected_type}
                                                                color={this.state.outdoor_selected_color}
                                                                width={310}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col2 weather-padding-left'>
                                                        <div className='card-body-weather-content'>
                                                            <div className='temperature' onClick={() => this.setState({
                                                                outdoor_selected_type: this.props.station_data.modules.OUTDOOR.data_type[0],
                                                                outdoor_selected_color: this.colorSelector('yellow')
                                                            })}>
                                                                <i className='wi wi-thermometer main-card-icon'/> <span className={cx(this.state.outdoor_selected_type === this.props.station_data.modules.OUTDOOR.data_type[0] && 'text-glow')}>{this.props.station_data.modules.OUTDOOR.data.temperature}°</span>
                                                            </div>
                                                            <div className='humidity' onClick={() => this.setState({
                                                                outdoor_selected_type: this.props.station_data.modules.OUTDOOR.data_type[1],
                                                                outdoor_selected_color: this.colorSelector('blue')
                                                            })}>
                                                                <i className='wi wi-humidity'/> <span className={cx(this.state.outdoor_selected_type === this.props.station_data.modules.OUTDOOR.data_type[1] && 'text-glow')}>{this.props.station_data.modules.OUTDOOR.data.humidity}%</span>
                                                            </div>
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
                                            <span className={this.setBatteryStatusIcon(this.props.station_data.modules.WIND.battery)} style={{paddingRight: '4px'}}/>
                                            <span className={this.setRadioStatusIcon(this.props.station_data.modules.WIND.radio)}/>
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
                                                            <div className='temperature text-glow'>
                                                                <i className='wi wi-small-craft-advisory main-card-icon'/> {this.props.station_data.modules.WIND.data.wind_strength}{this.props.user.windunit}
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
