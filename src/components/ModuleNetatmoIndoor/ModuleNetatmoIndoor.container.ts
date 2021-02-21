import {connect, ConnectedProps} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState} from "../../store";
import ModuleNetatmoIndoor from "./ModuleNetatmoIndoor"
import * as netatmoActions from "../../store/netatmo/actions";
import {modules, type} from "../../apis/netatmo/types";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    device_id: netatmo.station_data?.main_data.id,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_unit: application.user?.temperature_unit,
    orientation: application.orientation,
    number_of_additional_modules: netatmo.station_data?.modules.length,
    indoor_module_names: netatmo.station_data?.modules.filter(module => module.type === modules.indoor).map(module => module.module_name),
    selected_indoor_module: netatmo.selected_indoor_module,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Cbatmo.graph_timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
    onChangeSelectedType: (type: type, module: string) => dispatch(netatmoActions.onChangeSelectedType(type, module)),
    onChangeSelectedInsideModule: (module: number) => dispatch(netatmoActions.onChangeSelectedInsideModule(module)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleNetatmoIndoorContainer = connector(ModuleNetatmoIndoor);

export default ModuleNetatmoIndoorContainer
