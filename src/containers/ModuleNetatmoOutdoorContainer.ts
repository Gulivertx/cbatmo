import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoOutdoor from "../components/ModuleNetatmoOutdoor"
import * as netatmoActions from "../store/netatmo/actions";
import {DataTypes, Timelapse} from "../types/netatmo";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.OUTDOOR,
    device_id: netatmo.station_data?.id,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_ratio: application.user.temperature_ratio,
    temperature_unit: application.user.temperature_unit,
    orientation: application.orientation,
    selected_type: netatmo.selected_outdoor_type,
    measure_data: netatmo.measure_outdoor_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
    onChangeSelectedType: (type: DataTypes, module: string) => dispatch(netatmoActions.onChangeSelectedType(type, module)),
});

const ModuleNetatmoOutdoorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoOutdoor);

export default ModuleNetatmoOutdoorContainer
