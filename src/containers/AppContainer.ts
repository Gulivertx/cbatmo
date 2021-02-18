import {connect} from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import {ApplicationState} from "../store";
import App from "../components/App"

const mapStateToProps = ({ application, netatmo}: ApplicationState) => ({
    isConfigured: application.isConfigured,
    isStarting: application.isStarting,
    orientation: application.orientation,
    mobile: application.mobile,
    phone: application.phone,
    tablet: application.tablet,
    available_modules: netatmo.station_data?.available_modules,
    number_of_additional_modules: netatmo.station_data?.number_of_additional_modules,
    selected_indoor_module: netatmo.selected_indoor_module,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer
