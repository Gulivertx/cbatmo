import {connect} from 'react-redux'
import AppStarting from "../components/AppStarting"
import * as netatmoActions from "../store/netatmo/actions";
import * as applicationActions from "../store/application/actions";

const mapStateToProps = state => {
    return {
        loading_station_data: state.netatmo.loading_station_data,
        station_data_errors: state.netatmo.station_data_errors,
        info: state.application.info,
        loading: state.application.loading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchStationData: () => {
            dispatch(netatmoActions.fetchStationData());
        },
        appConfigured: () => {
            dispatch(applicationActions.appConfigured(true))
        }
    }
};

const AppStartingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStarting);

export default AppStartingContainer
