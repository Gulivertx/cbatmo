import {connect} from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import * as netatmoActions from "../store/netatmo/actions";
import * as applicationActions from "../store/application/actions";
import { ApplicationState } from "../store";
import AppStarting from "../components/AppStarting"

const mapStateToProps =  ({ application, netatmo}: ApplicationState) => ({
    loading_station_data: netatmo.loading_station_data,
    info: application.info,
    station_data_errors: netatmo.station_data_errors,
    refresh_token: netatmo.refresh_token,
    access_token: netatmo.access_token,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchAuth: () => dispatch(netatmoActions.fetchAuth()),
    fetchStationData: () => dispatch(netatmoActions.fetchStationData()),
    appConfigured: (value: boolean) => dispatch(applicationActions.appConfigured(value))
});

const AppStartingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStarting);

export default AppStartingContainer
