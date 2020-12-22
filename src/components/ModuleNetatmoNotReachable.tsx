import React from 'react';
import moment from 'moment';
import {Icon, Intent} from "@blueprintjs/core";
import { withTranslation, WithTranslation } from 'react-i18next';
import * as i18next from 'i18next';

// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState extends WithTranslation {
    last_seen?: number
    t: i18next.TFunction
}

const NetatmoModuleError: React.FunctionComponent<IPropsFromState> = (props) => {
    return (
        <div className="module-unreachable">
            <Icon icon="warning-sign" iconSize={40} intent={Intent.WARNING}/>
            <div className="description">
                <div>
                    {props.t('notifications.not_reachable')}
                </div>
                {
                    props.last_seen ? (
                        <div>Last seen : {moment.unix(props.last_seen).format('DD.MM.YYYY HH:mm')}.</div>
                    ) : null
                }
            </div>
        </div>
    )
};

export default withTranslation('common')(NetatmoModuleError);
