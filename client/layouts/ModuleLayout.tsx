import React from 'react';

import ModuleNetatmoNotReachable from '../components/ModuleNetatmoNotReachable';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    label?: string
    reachable?: boolean
    last_seen?: number
}

const ModuleLayout: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <div className="module-container">
            <div className="item-label">
                <div className="label">{props.label}</div>
                <div className="horizontal-top-divider" />
            </div>
            {
                props.reachable ? (
                    props.children
                ) : (
                    <ModuleNetatmoNotReachable last_seen={props.last_seen} />
                )
            }
            <div className="vertical-right-divider" />
        </div>
    )
};

export default ModuleLayout;
