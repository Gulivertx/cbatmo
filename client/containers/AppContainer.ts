import {connect} from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import {ApplicationState} from "../store";
import App from "../components/App"

const mapStateToProps = ({ application, netatmo}: ApplicationState) => ({
    isConfigured: application.isConfigured,
    orientation: application.orientation,
    available_modules: netatmo.station_data?.available_modules
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer
