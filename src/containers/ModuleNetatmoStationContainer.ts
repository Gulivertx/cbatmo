import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoStation from "../components/ModuleNetatmoStation"
import * as netatmoActions from "../store/netatmo/actions";
import {DataTypes, Timelapse} from "../types/netatmo";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    station_data: netatmo.station_data,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_unit: application.user.temperature_unit,
    pressure_unit: application.user.pressure_unit,
    orientation: application.orientation,
    selected_type: netatmo.selected_station_type,
    measure_data: netatmo.measure_station_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
    onChangeSelectedType: (type: DataTypes, module: string) => dispatch(netatmoActions.onChangeSelectedType(type, module)),
});

const ModuleNetatmoStationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoStation);

export default ModuleNetatmoStationContainer
