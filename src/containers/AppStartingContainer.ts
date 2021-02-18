import {connect} from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import * as netatmoActions from "../store/netatmo/actions";
import * as applicationActions from "../store/application/actions";
import { ApplicationState } from "../store";
import AppStarting from "../components/AppStarting"

const mapStateToProps =  ({ application, netatmo}: ApplicationState) => ({
    loading_auth: netatmo.loading_auth,
    loading_station_data: netatmo.loading_station_data,
    mobile: application.mobile,
    tablet: application.tablet,
    phone: application.phone,
    info: application.info,
    user: application.user,
    isConfigured: application.isConfigured,
    station_data_errors: netatmo.station_data_errors
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    setIsStarting: (value: boolean) => dispatch(applicationActions.setIsStarting(value)),
    fetchAuth: (username: string, password: string, secret: string) => dispatch(netatmoActions.fetchAuth(username, password, secret)),
    fetchStationData: () => dispatch(netatmoActions.fetchStationData())
});

const AppStartingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppStarting);

export default AppStartingContainer
