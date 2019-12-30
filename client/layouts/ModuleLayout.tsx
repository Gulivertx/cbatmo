import React from 'react';
import removeAccents from 'remove-accents';

import ModuleNetatmoNotReachable from '../components/ModuleNetatmoNotReachable';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    label?: string
    reachable?: boolean
    last_seen?: number
    fill?: boolean
    vertical_divider?: boolean
}

const ModuleLayout: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <div className="module-container" style={props.fill ? {flex: 1} : {minWidth: '180px'}}>
            <div className="item-label">
                <div className="label">{removeAccents(props.label? props.label : '')}</div>
                <div className="horizontal-top-divider" />
            </div>
            {
                props.reachable ? (
                    props.children
                ) : (
                    <ModuleNetatmoNotReachable last_seen={props.last_seen} />
                )
            }
            {
                props.vertical_divider && (
                    <div className="vertical-right-divider" />
                )
            }
        </div>
    )
};

export default ModuleLayout;
