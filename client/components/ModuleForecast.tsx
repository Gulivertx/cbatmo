import React from 'react';

import ModuleForecastDaily from "./ModuleForecastDaily";

import ModuleLayout from "../layouts/ModuleLayout";
import { IOpenWeatherState } from "../store/openweather/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    openweather: IOpenWeatherState
    locale: string
}

const ModuleDate: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout label='Forecast' reachable={true}>
            <div className="module-forecast">
                <ModuleForecastDaily data={props.openweather.data?.daily.data[0]} locale={props.locale} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[1]} locale={props.locale} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[2]} locale={props.locale} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[3]} locale={props.locale} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[4]} locale={props.locale} />
                <ModuleForecastDaily data={props.openweather.data?.daily.data[5]} locale={props.locale} />
            </div>
        </ModuleLayout>
    )
};

export default ModuleDate;
