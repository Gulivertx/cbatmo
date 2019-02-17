import React from 'react';
import PropTypes from "prop-types";

const HomescrrenAppInfo = ({appInfo}) => {
    return (
        <div className='homescreen-app-info text-center'>
            <span className='text-white text-uppercase'>{appInfo.name} {appInfo.version}</span> on <span className='text-white text-capitalize'>{appInfo.process.platform} {appInfo.process.arch}</span>
        </div>
    )
};

HomescrrenAppInfo.propTypes = {
    appInfo: PropTypes.object.isRequired
};

export default HomescrrenAppInfo;