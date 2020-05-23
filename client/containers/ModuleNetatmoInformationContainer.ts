import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoInformation from "../components/ModuleNetatmoInformation"

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    station_name: netatmo.station_data?.station_name,
    last_status_store: netatmo.station_data?.last_status_store,
    place: netatmo.station_data?.place,
    reachable: netatmo.station_data?.reachable,
    locale: application.user.lang,
    orientation: application.orientation
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoInformationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoInformation);

export default ModuleNetatmoInformationContainer
