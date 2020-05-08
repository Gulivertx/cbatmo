import React from 'react';
import cx from 'classnames';

interface IPropsFromState {
    condition?: number
    size?: number
}

const WeatherIcon: React.FunctionComponent<IPropsFromState> = ({condition, size = 1}) => {
    const setIcon = (condition?: number) => {
        /* OpenWeather mapping */
        switch (condition) {
            case 200:
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232: return 'wi-thunderstorm';
            case 300:
            case 301:
            case 302:
            case 310:
            case 311: return 'wi-sprinkle';
            case 312:
            case 313:
            case 314:
            case 321: return 'wi-dust';
            case 500: return 'wi-day-sprinkle';
            case 501: return 'wi-day-hail';
            case 502: return 'wi-rain';
            case 503: return 'wi-rain';
            case 504: return 'wi-rain';
            case 511: return 'wi-rain-mix';
            case 520: return 'wi-day-showers';
            case 521: return 'wi-showers';
            case 522: return 'wi-showers';
            case 531: return 'wi-showers';
            case 600: return 'wi-day-snow';
            case 601: return 'wi-snow';
            case 602: return 'wi-snow';
            case 611: return 'wi-sleet';
            case 612: return 'wi-day-sleet';
            case 613: return 'wi-sleet';
            case 615: return 'wi-rain-mix';
            case 616: return 'wi-rain-mix';
            case 620: return 'wi-day-snow';
            case 621: return 'wi-snow';
            case 622: return 'wi-snow';
            case 701: return 'wi-fog';
            case 711: return 'wi-smoke';
            case 721: return 'wi-fog';
            case 731: return 'wi-dust';
            case 741: return 'wi-fog';
            case 751: return 'wi-sandstorm';
            case 761: return 'wi-dust';
            case 762: return 'wi-volcano';
            case 771: return 'wi-strong-wind';
            case 781: return 'wi-fog';
            case 800: return 'wi-day-sunny';
            case 801: return 'wi-day-cloudy';
            case 802: return 'wi-cloud';
            case 803: return 'wi-cloudy';
            case 804: return 'wi-cloudy';
            default: return '';
        }
    };

    return (
        <i className={cx('wi wi-fw', setIcon(condition))} style={{fontSize: `${size}rem`, lineHeight: size / 3}} />
    )
};

export default WeatherIcon;
