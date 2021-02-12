import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoIndoor from "../components/ModuleNetatmoIndoor"
import * as netatmoActions from "../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.INDOOR,
    device_id: netatmo.station_data?.id,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_unit: application.user.temperature_unit,
    orientation: application.orientation,
    selected_type: netatmo.selected_indoor_type,
    measure_data: netatmo.measure_indoor_data,
    number_of_additional_modules: netatmo.station_data?.number_of_additional_modules,
    indoor_module_names: netatmo.station_data?.indoor_module_names,
    selected_indoor_module: netatmo.selected_indoor_module,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Netatmo.timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
    onChangeSelectedType: (type: Netatmo.data_type, module: string) => dispatch(netatmoActions.onChangeSelectedType(type, module)),
    onChangeSelectedInsideModule: (module: number) => dispatch(netatmoActions.onChangeSelectedInsideModule(module)),
});

const ModuleNetatmoIndoorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoIndoor);

export default ModuleNetatmoIndoorContainer
