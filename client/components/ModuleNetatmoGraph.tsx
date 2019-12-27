import React from 'react';
import { Colors } from "@blueprintjs/core";

import ModuleLayout from "../layouts/ModuleLayout";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    //module_data: INetatmoNAModule3|undefined
}

/** Rain module */
const NetatmoModuleGraph: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <ModuleLayout
            label="Graph"
            reachable={true}
        >
            <div className="modules-layout">
                <div style={{width: '300px'}} />
            </div>
        </ModuleLayout>
    )
};

export default NetatmoModuleGraph
