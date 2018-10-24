import React from 'react';
import PropTypes from "prop-types";
import moment from "moment/moment";
import 'moment/locale/fr-ch';

moment.locale('en');

const HomescrrenAppInfo = ({appInfo}) => {
    return (
        <div className='homescreen-app-info text-center'>
            <span className='text-white text-uppercase'>{appInfo.name} {appInfo.version}</span> on <span className='text-white text-capitalize'>{appInfo.process.platform} {appInfo.process.arch}</span> up from <span className='text-white'>{appInfo.process.uptime}</span>
        </div>
    )
};

HomescrrenAppInfo.propTypes = {
    appInfo: PropTypes.object.isRequired
};

export default HomescrrenAppInfo;