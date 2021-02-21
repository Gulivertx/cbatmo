import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleNetatmoWind from "./ModuleNetatmoWind"
import * as netatmoActions from "../../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    device_id: netatmo.station_data?.main_data.id,
    unit: application.user?.wind_unit,
    selected_timelapse: netatmo.selected_timelapse,
    wind_ratio: application.user?.wind_ratio,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Cbatmo.graph_timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleNetatmoWindContainer = connector(ModuleNetatmoWind);

export default ModuleNetatmoWindContainer
