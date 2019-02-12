import React from 'react';
import PropTypes from "prop-types";

import moment from 'moment';

//TODO translation
const NetatmoModuleError = ({data}) => {

    return (
        <div className='row'>
            <div style={{float: 'left', height: '85px', width: '100%'}}>
                <p className='text-center'>Ce module ne peut pas joindre la Station. Vérifiez l'état des piles ou rapprochez-le de la Station.</p>
                {data.last_seen && <p className='text-center'>Vu pour la dernière fois le : {moment.unix(data.last_seen).format('DD.MM.YYYY HH:mm')}.</p>}
            </div>

        </div>
    )
};

NetatmoModuleError.propTypes = {
    data: PropTypes.object.isRequired,
};

export default NetatmoModuleError;