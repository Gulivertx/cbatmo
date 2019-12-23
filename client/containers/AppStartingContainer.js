import {connect} from 'react-redux'
import AppStarting from "../components/AppStarting"
import * as netatmoActions from "../store/netatmo/actions";
import * as applicationActions from "../store/application/actions";

const mapStateToProps = state => {
    return {
        loading_station_data: state.netatmo.loading_station_data,
        station_data_errors: state.netatmo.station_data_errors,
        refresh_token: state.netatmo.refresh_token,
        access_token: state.netatmo.access_token,
        info: state.application.info,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAuth: () => {
            dispatch(netatmoActions.fetchAuth());
        },
        fetchStationData: () => {
            dispatch(netatmoActions.fetchStationData());
        },
        appConfigured: (value) => {
            dispatch(applicationActions.appConfigured(value))
        }
    }
};

const AppStartingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStarting);

export default AppStartingContainer
