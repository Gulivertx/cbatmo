import React from 'react';
import WeatherIcon from "./WeatherIcon";
import HomescreenWeatherDaily from './HomescreenWeatherDaily'
import moment from "moment/moment";
import PropTypes from "prop-types";

const HomescreenWaether = ({darkskyData, netatmoData, locale}) => {
    // Set locale for moment
    if (locale === 'fr') {
        console.log('Set moment to fr');
        require('moment/locale/fr');
        moment.locale('fr');
    } else {
        moment.locale('en');
        console.log('Set moment to en')
    }

    return (
        <div className='homescreen-weather'>
            <div className='homescreen-forecast'>
                {darkskyData.daily.summary}
            </div>
            <div className='col-1'>
                <div className='current-condition'>
                    <div className='main-icon'>
                        <WeatherIcon condition={darkskyData.currently.icon}/>
                    </div>
                    <div className='main-temp-box'>
                        <div className='main-temp-label'>Dark Sky</div>
                        <div className='main-temp'>
                            {Math.round(darkskyData.currently.temperature)}°
                            <div className='min-max-temp'>
                                <div><i className='wi wi-thermometer-exterior color-gray'/> <span className='text-white'>{Math.round(darkskyData.daily.data[0].temperatureLow)}°</span></div>
                                <div><i className='wi wi-thermometer color-gray'/> <span className='text-white'>{Math.round(darkskyData.daily.data[0].temperatureHigh)}°</span></div>
                            </div>
                        </div>
                        <div className='main-temp-label'>Netatmo</div>
                        <div className='main-temp'>{netatmoData.modules[0].dashboard_data.Temperature}°</div>
                    </div>
                </div>
                <div className='day-forcast'>
                    <div className='inline'><i className="zmdi zmdi-pin"/> <span className='text-white'>{netatmoData.place.city}</span></div>
                    <div className='inline'><i className='wi wi-sunrise'/> <span className='text-white'>{moment.unix(darkskyData.daily.data[0].sunriseTime).format('HH:mm')}</span></div>
                    <div className='inline'><i className='wi wi-sunset'/> <span className='text-white'>{moment.unix(darkskyData.daily.data[0].sunsetTime).format('HH:mm')}</span></div>
                </div>
            </div>

            <div className='col-2'>
                <div className='box-hourly'>
                    <HomescreenWeatherDaily data={darkskyData.daily.data[1]} day={1} locale={locale}/>
                    <HomescreenWeatherDaily data={darkskyData.daily.data[2]} day={2} locale={locale}/>
                    <HomescreenWeatherDaily data={darkskyData.daily.data[3]} day={3} locale={locale}/>
                    <HomescreenWeatherDaily data={darkskyData.daily.data[4]} day={4} locale={locale}/>
                    <HomescreenWeatherDaily data={darkskyData.daily.data[5]} day={5} locale={locale}/>
                </div>
            </div>
        </div>
    )
};

HomescreenWaether.propTypes = {
    darkskyData: PropTypes.object.isRequired,
    netatmoData: PropTypes.object.isRequired,
};

export default HomescreenWaether;