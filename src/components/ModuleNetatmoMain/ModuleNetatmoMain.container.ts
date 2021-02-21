import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleNetatmoMain from "./ModuleNetatmoMain"
import * as netatmoActions from "../../store/netatmo/actions";
import {type} from "../../apis/netatmo/types";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    main_data: netatmo.station_data?.main_data,
    selected_timelapse: netatmo.selected_timelapse,
    temperature_unit: application.user?.temperature_unit,
    pressure_unit: application.user?.pressure_unit,
    orientation: application.orientation,
    selected_type: netatmo.selected_station_type,
    measure_data: netatmo.measure_station_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Cbatmo.graph_timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
    onChangeSelectedType: (type: type, module: string) => dispatch(netatmoActions.onChangeSelectedType(type, module)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleNetatmoMainContainer = connector(ModuleNetatmoMain);

export default ModuleNetatmoMainContainer
