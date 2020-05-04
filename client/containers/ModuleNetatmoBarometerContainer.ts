import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoBarometer from "../components/ModuleNetatmoBarometer"
import * as netatmoActions from "../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    reachable: netatmo.station_data?.reachable,
    pressure: netatmo.station_data?.data?.pressure,
    unit: application.user.pressure_unit,
    device_id: netatmo.station_data?.id,
    selected_timelapse: netatmo.selected_timelapse,
    pressure_ratio: application.user.pressure_ratio,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: '12h'|'1d'|'1m') => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse))
});

const ModuleNetatmoBarometerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoBarometer);

export default ModuleNetatmoBarometerContainer
