import React from 'react';

import WeatherIcon from "./WeatherIcon";

import ModuleLayout from "../layouts/ModuleLayout";
import { IDarkskyState } from "../store/darksky/types";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    darksky: IDarkskyState
}

const ModuleDate: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout label='Current weather' reachable={true}>
            <div className="module-forecast">
                <WeatherIcon condition={props.darksky.data?.currently.icon} size={6} />
            </div>
        </ModuleLayout>
    )
};

export default ModuleDate;
