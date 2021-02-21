import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleNetatmoOutdoor from "./ModuleNetatmoOutdoor"
import * as netatmoActions from "../../store/netatmo/actions";
import {type} from "../../apis/netatmo/types";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    device_id: netatmo.station_data?.main_data.id,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_ratio: application.user?.temperature_ratio,
    temperature_unit: application.user?.temperature_unit,
    orientation: application.orientation,
    selected_type: netatmo.selected_outdoor_type,
    measure_data: netatmo.measure_outdoor_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Cbatmo.graph_timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
    onChangeSelectedType: (type: type, module: string) => dispatch(netatmoActions.onChangeSelectedType(type, module)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleNetatmoOutdoorContainer = connector(ModuleNetatmoOutdoor);

export default ModuleNetatmoOutdoorContainer
