import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleNetatmoBarometer from "./ModuleNetatmoBarometer"
import * as netatmoActions from "../../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    reachable: netatmo.station_data?.main_data.reachable,
    pressure: netatmo.station_data?.main_data?.pressure,
    pressure_unit: application.user?.pressure_unit,
    device_id: netatmo.station_data?.main_data.id,
    selected_timelapse: netatmo.selected_timelapse,
    pressure_ratio: application.user?.pressure_ratio,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Cbatmo.graph_timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleNetatmoBarometerContainer = connector(ModuleNetatmoBarometer);

export default ModuleNetatmoBarometerContainer
