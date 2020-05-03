import React from 'react';
import removeAccents from 'remove-accents';
import { Colors } from "@blueprintjs/core";
import cx from 'classnames';

import WeatherIcon from "./WeatherIcon";
import { momentWithLocale } from '../utils/tools'
import { IDailyData } from "../models/WeatherInterface";

interface IPropsFromState {
    data: IDailyData|undefined
    locale: string
    phone?: string
}

const ModuleForecastDaily: React.FunctionComponent<IPropsFromState> = ({data, locale, phone}) => {
    let moment = momentWithLocale(locale);

    return (
        <div className="module-forecast-daily">
            <div className={cx('label', !data && 'bp3-skeleton')}>
                { data ? (moment.unix(data.time).format('dddd')) : 'Monday' }
            </div>
            {
                !phone ? (
                    <div className="row">
                        <div
                            className={cx('sub-label', !data && 'bp3-skeleton')}
                            style={{ color: Colors.GRAY4 }}
                        >
                            {data && removeAccents(momentWithLocale(locale).unix(data?.time).format('DD MMM'))}
                        </div>
                    </div>
                ) : null
            }
            <div className="daily-temperatures">
                <div className={cx(!data && 'bp3-skeleton')}>
                    { data ? data.temperature_low.toFixed(0) : '0.0'}°
                </div>
                <div className={cx(!data && 'bp3-skeleton')}>
                    {data ? data.temperature_high.toFixed(0) : '0.0'}°
                </div>
            </div>
            <div className={cx('icon', !data && 'bp3-skeleton')}>
                <WeatherIcon condition={data?.icon} size={2}/>
            </div>
        </div>
    )
};

export default ModuleForecastDaily;
