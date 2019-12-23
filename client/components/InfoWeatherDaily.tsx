import React from 'react';
import { Colors } from "@blueprintjs/core";

import WeatherIcon from "./WeatherIcon";
import {momentWithLocale} from '../utils/tools'

interface IPropsFromState {
    data: any
    locale: string
}

const InfoWeatherDaily: React.FunctionComponent<IPropsFromState> = ({data, locale}) => {
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

export default InfoWeatherDaily;
