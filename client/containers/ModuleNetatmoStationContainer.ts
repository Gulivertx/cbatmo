import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoStation from "../components/ModuleNetatmoStation"
import * as netatmoActions from "../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    station_data: netatmo.station_data,
    device_id: netatmo.station_data?.id,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_ratio: application.user.temperature_ratio,
    unit: application.user.unit
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: '12h'|'1d'|'1m') => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse))
});

const ModuleNetatmoStationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoStation);

export default ModuleNetatmoStationContainer
