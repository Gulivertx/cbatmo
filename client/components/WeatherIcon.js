import React from 'react';

const WeatherIcon = ({condition}) => {
    const defaultClass = 'text-white wi large ';

    const setIcon = (condition) => {
        switch (condition) {
            case 'clear-day': return defaultClass + 'wi-day-sunny';
            case 'clear-night': return  defaultClass + 'wi-night-clear';
            case 'rain': return  defaultClass + 'wi-rain';
            case 'snow': return  defaultClass + 'wi-snow';
            case 'sleet': return  defaultClass + 'wi-snow';
            case 'wind': return  defaultClass + 'wi-strong-wind';
            case 'fog': return  defaultClass + 'wi-fog';
            case 'cloudy': return  defaultClass + 'wi-day-cloudy';
            case 'partly-cloudy-day': return  defaultClass + 'wi-day-cloudy';
            case 'partly-cloudy-night': return  defaultClass + 'wi-night-alt-cloudy';
            case 'hail': return  defaultClass + 'wi-hail';
            case 'thunderstorm': return  defaultClass + 'wi-thunderstorm';
            case 'tornado': return  defaultClass + 'wi-tornado';
        }
    };

    return (
        <i className={setIcon(condition)}/>
    )
};

export default WeatherIcon;
