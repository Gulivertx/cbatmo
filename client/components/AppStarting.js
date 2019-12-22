import React from 'react';
import PropTypes from "prop-types";
import cx from 'classnames';
import { Colors, Spinner, Intent } from '@blueprintjs/core';

import { ContextMainLayout } from "../layouts/MainLayout";

class AppStarting extends React.Component {
    componentDidMount() {
        this.props.fetchStationData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loading_station_data && prevProps.loading_station_data !== this.props.loading_station_data) {
            if (!this.props.station_data_errors) {
                this.context.addToast('tick-circle', 'Configured with success, please wait...', Intent.SUCCESS);
                setTimeout(() => this.props.appConfigured(), 2000);
            } else {
                this.context.addToast('error', 'Oops, an error occur!', Intent.DANGER);
            }
        }
    }

    render() {
        const { info, loading } = this.props;

        return (
            <div className="starting-page-layout">
                <div className="content">
                    <h1 className={cx("title", loading && "bp3-skeleton")}>{info.name}</h1>
                    <h4 className={cx(loading && "bp3-skeleton")} style={{ color: Colors.GRAY3 }}>Version {info.version}</h4>
                    <div className={cx("description", loading && "bp3-skeleton")}>{info.description}</div>

                    <div className="loader">
                        <Spinner size={ Spinner.SIZE_STANDARD } />
                    </div>

                    {
                        this.props.station_data_errors && (
                            <div className='loading text-red'>Ouch, an error occur!</div>
                        )
                    }
                </div>
                <div className={cx("footer", loading && "bp3-skeleton")} style={{ color: Colors.GRAY3 }}>
                    Created by {info.author}
                </div>
            </div>
        )
    }
}

AppStarting.contextType = ContextMainLayout;

AppStarting.propType = {
    loading_station_data: PropTypes.bool.isRequired,
    fetchStationData: PropTypes.func.isRequired,
    appConfigured: PropTypes.func.isRequired,
    info: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        version: PropTypes.string,
        author: PropTypes.string
    }),
    loading: PropTypes.bool.isRequired
};

export default AppStarting
