import React from 'react';
import PropTypes from "prop-types";

import moment from 'moment';

//TODO translation
const NetatmoModuleError = ({data}) => {

    return (
        <div className='row'>
            <div style={{float: 'left', height: '85px', width: '100%'}}>
                <p className='text-center'>This module cannot reach the Station. Check the battery status or bring it closer to the Station</p>
                {data.last_seen && <p className='text-center'>Last seen : {moment.unix(data.last_seen).format('DD.MM.YYYY HH:mm')}</p>}
            </div>

        </div>
    )
};

NetatmoModuleError.propTypes = {
    data: PropTypes.object.isRequired,
};

export default NetatmoModuleError;