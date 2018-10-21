import React from 'react';
import PropTypes from "prop-types";
import FirstAppSettingsNetatmo from "./FirstAppSettingsNetatmo";

const FirstAppSettingsWelcome = ({next, appInfo}) => {
    return (
        <div className='content-centered text-center'>
            <div className='card'>
                <div className='card-body'>
                    <h1 className='text-uppercase'>{appInfo.name}</h1>
                    <h3>Version {appInfo.version}</h3>
                    <p>{appInfo.description}</p>
                    <p>App created by {appInfo.author}</p>
                    <button className='btn btn-dark' onClick={next}>Next</button>
                    <div className='m-20'/>
                </div>
            </div>
        </div>
    )
};

FirstAppSettingsNetatmo.propType = {
    next: PropTypes.func.isRequired,
    appInfo: PropTypes.object.isRequired,
};

export default FirstAppSettingsWelcome