import React from 'react';
import { Colors } from "@blueprintjs/core";
import cx from 'classnames';

import WeatherIcon from "./WeatherIcon";
import { momentWithLocale } from '../utils/tools'
import { IDailyData } from "../models/DarkskyData";

interface IPropsFromState {
    data: IDailyData|undefined
    locale: string
}

const ModuleForecastDaily: React.FunctionComponent<IPropsFromState> = ({data, locale}) => {
    let moment = momentWithLocale(locale);

    return (
        <div className="module-forecast-daily">
            <div className={cx('label', !data && 'bp3-skeleton')}>
                { data ? (moment.unix(data.time).format('dddd')) : 'Monday' }
            </div>
            <div className="daily-temperatures">
                <div className={cx(!data && 'bp3-skeleton')}>
                    <div className="sub-label" style={{ color: Colors.GRAY4 }}>Min</div>
                    { data ? data.temperature_low.toFixed(0) : '0.0'}°
                </div>
                <div className={cx(!data && 'bp3-skeleton')}>
                    <div className="sub-label" style={{ color: Colors.GRAY4, textAlign: "right" }}>Max</div>
                    {data ? data.temperature_high.toFixed(0) : '0.0'}°
                </div>
            </div>
            <div className={cx('icon', !data && 'bp3-skeleton')}>
                <WeatherIcon condition={data? data.icon : 'clear-day'} size={2}/>
            </div>
        </div>
    )
};

export default ModuleForecastDaily;
