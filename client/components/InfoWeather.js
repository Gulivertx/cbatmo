import React from 'react';
import PropTypes from "prop-types";
import { Colors, Divider } from '@blueprintjs/core';

import WeatherIcon from "./WeatherIcon";
import InfoWeatherDaily from './InfoWeatherDaily'
import NetatmoModuleError from "./NetatmoModuleError";

import { momentWithLocale } from '../utils/tools';

const InfoWeather = ({darkskyData, netatmoData, locale}) => {
    let moment = momentWithLocale(locale);

    return (
        <div className="weather-layout">
            <div className="current-weather">
                <div className="current-icon">
                    <WeatherIcon condition={darkskyData.currently.icon} />
                </div>

                {
                    netatmoData.modules.OUTDOOR.reachable ? (
                        <div className="current-temperature-wrapper">
                            <div className="current-temperature">
                                {netatmoData.modules.OUTDOOR.data.temperature}°
                            </div>
                            <div className="current-temperature-min_max">
                                <div style={{ color: Colors.GRAY3 }}><i className="wi wi-thermometer-exterior"/> {netatmoData.modules.OUTDOOR.data.min_temp}°</div>
                                <div style={{ color: Colors.GRAY3 }}><i className="wi wi-thermometer"/> {netatmoData.modules.OUTDOOR.data.max_temp}°</div>
                            </div>
                        </div>
                    ) : (
                        <NetatmoModuleError data={netatmoData.modules.OUTDOOR} small={true} />
                    )
                }
            </div>

            <div className='sunset-sunrise-wrapper'>
                <div style={{ color: Colors.GRAY3 }}><i className='wi wi-sunrise'/> {moment.unix(darkskyData.daily.data[0].sunrise_time).format('HH:mm')}</div>
                <div style={{ color: Colors.GRAY3 }}><i className='wi wi-sunset'/> {moment.unix(darkskyData.daily.data[0].sunset_time).format('HH:mm')}</div>
            </div>

            <Divider />

            <div className="weather-days-wrapper">
                <InfoWeatherDaily data={darkskyData.daily.data[1]} day={1} locale={locale}/>
                <InfoWeatherDaily data={darkskyData.daily.data[2]} day={2} locale={locale}/>
                <InfoWeatherDaily data={darkskyData.daily.data[3]} day={3} locale={locale}/>
                <InfoWeatherDaily data={darkskyData.daily.data[4]} day={4} locale={locale}/>
                <InfoWeatherDaily data={darkskyData.daily.data[5]} day={5} locale={locale}/>
            </div>
        </div>
    )
};

InfoWeather.propTypes = {
    darkskyData: PropTypes.object.isRequired,
    netatmoData: PropTypes.object.isRequired,
};

export default InfoWeather;
