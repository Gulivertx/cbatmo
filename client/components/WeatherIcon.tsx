import React from 'react';
import cx from 'classnames';

interface IPropsFromState {
    condition?: string
    size?: number
}

const WeatherIcon: React.FunctionComponent<IPropsFromState> = ({condition, size = 1}) => {
    const setIcon = (condition?: string) => {
        /* DARKSKY mapping
        switch (condition) {
            case 'clear-day': return 'wi-day-sunny';
            case 'clear-night': return 'wi-night-clear';
            case 'rain': return 'wi-rain';
            case 'snow': return 'wi-snow';
            case 'sleet': return 'wi-sleet';
            case 'wind': return 'wi-strong-wind';
            case 'fog': return 'wi-fog';
            case 'cloudy': return 'wi-day-cloudy';
            case 'partly-cloudy-day': return 'wi-day-cloudy';
            case 'partly-cloudy-night': return 'wi-night-alt-cloudy';
            case 'hail': return 'wi-hail';
            case 'thunderstorm': return 'wi-thunderstorm';
            case 'tornado': return 'wi-tornado';
            default: return '';
        }
        */

        /* OpenWeather mapping */
        switch (condition) {
            case '11d': return 'wi-thunderstorm';
            case '09d': return 'wi-rain';
            case '10d': return 'wi-night-showers';
            case '13d': return 'wi-snow';
            case '50d': return 'wi-fog';
            case '01d': return 'wi-day-sunny';
            case '01n': return 'wi-night-clear';
            case '02d': return 'wi-day-cloudy';
            case '02n': return 'wi-night-alt-cloudy';
            case '03d': return 'wi-cloud';
            case '03n': return 'wi-cloud';
            case '04d': return 'wi-cloudy';
            case '04n': return 'wi-cloudy';
            default: return '';
        }
    };

    return (
        <i className={cx('wi wi-fw', setIcon(condition))} style={{fontSize: `${size}rem`, lineHeight: size / 3}} />
    )
};

export default WeatherIcon;
