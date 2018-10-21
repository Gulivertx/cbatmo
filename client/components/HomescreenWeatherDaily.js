import React from 'react';
import cx from 'classnames';
import WeatherIcon from "./WeatherIcon";
import moment from "moment/moment";
import 'moment/locale/fr-ch';
import PropTypes from "prop-types";

moment.locale('en');

const HomescreenWeatherDaily = ({data, day}) => {

    return (
        <div className={cx('col-hourly', day === 5 && 'no-right-border')}>
            <div className='label'>{moment.unix(data.time).format('dddd')}</div>
            <div className='icon'><WeatherIcon condition={data.icon}/></div>
            <div className='temp'>{Math.round(data.temperatureLow)}° <span className='color-gray'>/</span> {Math.round(data.temperatureHigh)}°</div>
        </div>
    )
};

HomescreenWeatherDaily.propTypes = {
    data: PropTypes.object.isRequired,
    day: PropTypes.number.isRequired
};

export default HomescreenWeatherDaily;