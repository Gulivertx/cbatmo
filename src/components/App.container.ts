import {connect, ConnectedProps} from 'react-redux'
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
    modules: netatmo.station_data?.modules,
    number_of_additional_modules: netatmo.station_data?.modules.length,
    selected_indoor_module: netatmo.selected_indoor_module,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const AppContainer = connector(App);

export default AppContainer
