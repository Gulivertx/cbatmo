import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';
import ModuleForecastDaily from "./ModuleForecastDaily";

import ModuleLayout from "../layouts/ModuleLayout";
import { IOpenWeatherState } from "../store/openweather/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState extends WithTranslation  {
    openweather: IOpenWeatherState
    locale: string
    phone?: string
    t: i18next.TFunction
}

const ModuleDate: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout label={props.t('forecast.forecast')} reachable={true} fill={true}>
            <div className="module-forecast">
                <ModuleForecastDaily data={props.openweather.data?.daily.data[0]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[1]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[2]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[3]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[4]} locale={props.locale} phone={props.phone} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[5]} locale={props.locale} phone={props.phone} />
            </div>
        </ModuleLayout>
    )
};

export default withTranslation('common')(ModuleDate);
