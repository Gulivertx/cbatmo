import React from 'react';
import cx from 'classnames';

const WeatherIcon = ({condition}) => {
    const setIcon = (condition) => {
        switch (condition) {
            case 'clear-day': return 'wi-day-sunny';
            case 'clear-night': return 'wi-night-clear';
            case 'rain': return 'wi-rain';
            case 'snow': return 'wi-snow';
            case 'sleet': return 'wi-snow';
            case 'wind': return 'wi-strong-wind';
            case 'fog': return 'wi-fog';
            case 'cloudy': return 'wi-day-cloudy';
            case 'partly-cloudy-day': return 'wi-day-cloudy';
            case 'partly-cloudy-night': return 'wi-night-alt-cloudy';
            case 'hail': return 'wi-hail';
            case 'thunderstorm': return 'wi-thunderstorm';
            case 'tornado': return 'wi-tornado';
        }
    };

    return (
        <i className={cx('wi wi-fw', setIcon(condition))}/>
    )
};

export default WeatherIcon;
