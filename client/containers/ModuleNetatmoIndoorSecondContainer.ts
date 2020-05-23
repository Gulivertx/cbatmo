import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoIndoor from "../components/ModuleNetatmoIndoor"
import * as netatmoActions from "../store/netatmo/actions";
import {Types} from "../models/NetatmoChartsData";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.INDOOR_SECOND,
    device_id: netatmo.station_data?.id,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_unit: application.user.temperature_unit,
    orientation: application.orientation,
    selected_type: netatmo.selected_indoor_second_type,
    measure_data: netatmo.measure_indoor_second_data,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: '12h'|'1d'|'1m') => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
    onChangeSelectedType: (type: Types, module: string) => dispatch(netatmoActions.onChangeSelectedType(type, module)),
});

const ModuleNetatmoIndoorSecondContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoIndoor);

export default ModuleNetatmoIndoorSecondContainer
