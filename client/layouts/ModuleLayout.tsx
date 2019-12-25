import React from 'react';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    label: string
}

const ModuleLayout: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <div className="box-container">
            <div className="item-label">
                <div className="label">{props.label}</div>
                <div className="horizontal-top-divider" />
            </div>
            {props.children}
            <div className="vertical-right-divider" />
        </div>
    )
};

export default ModuleLayout;
