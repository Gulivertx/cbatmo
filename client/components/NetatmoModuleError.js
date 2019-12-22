import React from 'react';
import PropTypes from "prop-types";

import moment from 'moment';
import {Icon, Intent, Colors} from "@blueprintjs/core";

const NetatmoModuleError = ({ data, small }) => {
    if (small) {
        return (
            <div className="module-unreachable">
                <div className="icon">
                    <Icon icon="warning-sign" iconSize={Icon.SIZE_LARGE} intent={Intent.WARNING} />
                </div>
                <div className="description-wrapper">
                    <div className="description-small" style={{ color: Colors.GRAY3 }}>The module {data.module_name} is unavailable</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="module-unreachable">
                <div className="icon">
                    <Icon icon="warning-sign" iconSize={Icon.SIZE_LARGE} intent={Intent.WARNING} />
                </div>
                <div className="description-wrapper">
                    <div className="description" style={{ color: Colors.GRAY3 }}>The module {data.module_name} cannot reach the Station. Check the battery status or bring it closer to the Station</div>
                    {
                        data.last_seen && (
                            <div className="last-seen" style={{ color: Colors.GRAY3 }}>Last seen : {moment.unix(data.last_seen).format('DD.MM.YYYY HH:mm')}</div>
                        )
                    }
                </div>
            </div>
        )
    }
};

NetatmoModuleError.propTypes = {
    data: PropTypes.object.isRequired,
    small: PropTypes.bool,
};

export default NetatmoModuleError;
