import React from 'react';
import PropTypes from "prop-types";
import { Divider } from '@blueprintjs/core';

import HomescreenDateTime from '../components/InfoDateTime';
import HomescreenWeather from '../components/InfoWeather';
import ErrorBoundary from '../components/ErrorBoundary';

const INTERVAL_IN_MINUTES = 1, REFRESH_TIME = INTERVAL_IN_MINUTES * 60 * 1000;

class InfoLayout extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;

        this.props.fetchDarksky();
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.fetchDarksky();
        }, REFRESH_TIME);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="info-layout">
                <HomescreenDateTime locale={this.props.locale}/>
                <Divider />
                <ErrorBoundary>
                    {
                        !this.props.first_fetch && (
                            <HomescreenWeather darkskyData={this.props.darkskyData} netatmoData={this.props.netatmoData} locale={this.props.locale}/>
                        )
                    }
                </ErrorBoundary>
            </div>
        )
    }
}

InfoLayout.propTypes = {
    darkskyData: PropTypes.object,
    netatmoData: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    first_fetch: PropTypes.bool.isRequired,
    fetchDarksky: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
};

export default InfoLayout;
