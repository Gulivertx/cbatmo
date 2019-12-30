import React from 'react';
import moment from 'moment';
import {Icon, Intent} from "@blueprintjs/core";

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
    last_seen?: number
}

const NetatmoModuleError: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <div className="module-unreachable">
            <Icon icon="warning-sign" iconSize={40} intent={Intent.WARNING}/>
            <div className="description">
                <div>
                    This module cannot reach the Station. Check the battery status or bring it closer
                    to the Station.
                </div>
                {
                    props.last_seen && (
                        <div>Last seen : {moment.unix(props.last_seen).format('DD.MM.YYYY HH:mm')}.</div>
                    )
                }
            </div>
        </div>
    )
};

export default NetatmoModuleError;
