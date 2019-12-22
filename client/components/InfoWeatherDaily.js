import React from 'react';
import PropTypes from "prop-types";
import {Colors} from "@blueprintjs/core";

import WeatherIcon from "./WeatherIcon";
import {momentWithLocale} from '../utils/tools'

const InfoWeatherDaily = ({data, day, locale}) => {
    let moment = momentWithLocale(locale);

    return (
        <div className="weather-day-wrapper">
            <div>
                <div className="label" style={{ color: Colors.GRAY4 }}>{moment.unix(data.time).format('dddd')}</div>
                <div className="temperature-wrapper">
                    <div className="temperature"><i className="wi wi-thermometer-exterior" style={{ color: Colors.GRAY3 }} /> {Math.round(data.temperature_low)}° </div>
                    <div className="temperature"><i className="wi wi-thermometer" style={{ color: Colors.GRAY3 }} /> {Math.round(data.temperature_high)}°</div>
                </div>
            </div>
            <div className="icon"><WeatherIcon condition={data.icon}/></div>
        </div>
    )
};

InfoWeatherDaily.propTypes = {
    data: PropTypes.object.isRequired,
    day: PropTypes.number.isRequired,
    locale: PropTypes.string.isRequired,
};

export default InfoWeatherDaily;
