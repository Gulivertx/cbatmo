import React from 'react';

import ModuleLayout from "../layouts/ModuleLayout";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    reachable?: boolean
    pressure?: number
    unit: string
}

/** Outdoor module */
const NetatmoModuleBarmometer: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout
            label="Barometer"
            reachable={props.reachable}
            vertical_divider={true}
        >
            <div className="modules-layout">
                <div className="row">
                    <div className="pressure">
                        {props.pressure}<small>{props.unit}</small>
                    </div>
                </div>
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleBarmometer
