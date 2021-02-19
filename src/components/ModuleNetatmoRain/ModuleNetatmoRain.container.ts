import {connect, ConnectedProps} from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../../store";
import ModuleNetatmoRain from "./ModuleNetatmoRain"
import * as netatmoActions from "../../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application }: ApplicationState) => ({
    device_id: netatmo.station_data?.main_data.id,
    selected_timelapse: netatmo.selected_timelapse,
    distance_unit: application.user.distance_unit,
    rain_ratio: application.user.rain_ratio,
    orientation: application.orientation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Netatmo.timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const ModuleNetatmoRainContainer = connector(ModuleNetatmoRain);

export default ModuleNetatmoRainContainer
