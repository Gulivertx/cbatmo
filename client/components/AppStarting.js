import React from 'react';
import PropTypes from "prop-types";

class AppStarting extends React.Component {

    componentDidMount() {
        this.props.fetchStationData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loading_station_data && prevProps.loading_station_data !== this.props.loading_station_data) {
            if (!this.props.station_data_errors) {
                setTimeout(() => this.props.appConfigured(), 2000)
            }
        }
    }

    render() {
        return (
            <div className='content-centered text-center'>
                <div className='card'>
                    <div className='card-body'>
                        <div>
                            <h2 className='text-uppercase'>Starting CBatmo</h2>
                            <p>Detecting your Netatmo settings and installed modules on your station</p>

                            {
                                this.props.loading_station_data ? (
                                    <div className='loading'>
                                        Loading....
                                    </div>
                                ) : (
                                    this.props.station_data_errors ? (
                                        <div className='loading text-red'>Ouch, an error occur!</div>
                                    ) : (
                                        <div className='loading'>Success</div>
                                    )
                                )
                            }
                        </div>
                        <div className='m-20'/>
                    </div>
                </div>
            </div>
        )
    }
}

AppStarting.propType = {
    loading_station_data: PropTypes.bool.isRequired,
    fetchStationData: PropTypes.func.isRequired,
    appConfigured: PropTypes.func.isRequired
};

export default AppStarting