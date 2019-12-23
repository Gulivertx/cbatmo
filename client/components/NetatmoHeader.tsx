import React from 'react';

import NetatmoTimer from "./NetatmoTimer";

interface IPropsFromState {
    data: any
    locale: string
}

const NetatmoHeader: React.FunctionComponent<IPropsFromState> = ({ data, locale }) => {
    return (
        <div className="netatmo-header">
            <h3>{data.station_name}</h3>
            <NetatmoTimer last_status_store={data.last_status_store} locale={locale}/>
            <h3>{data.place.city} - {data.place.altitude}m</h3>
        </div>
    )
};

export default NetatmoHeader
