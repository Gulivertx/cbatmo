import React from 'react';
import cx from 'classnames';

interface IPropsFromState {
    condition: string
}

const WeatherIcon: React.FunctionComponent<IPropsFromState> = ({condition}) => {
    const setIcon = (condition: string) => {
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
