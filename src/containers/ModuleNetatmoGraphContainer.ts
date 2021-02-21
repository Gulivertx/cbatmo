import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import ModuleNetatmoGraph from "../components/ModuleNetatmoGraph";
import {ApplicationState} from "../store";
import * as netatmoActions from "../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application }: ApplicationState) => ({
    measure_data: netatmo.measure_data,
    selected_types: netatmo.selected_types,
    selected_module: netatmo.selected_module,
    selected_timelapse: netatmo.selected_timelapse,
    station_data: netatmo.station_data,
    phone: application.phone,
    mobile: application.mobile,
    orientation: application.orientation
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: Cbatmo.graph_timelapse) => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse)),
});

const ModuleNetatmoRainGraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoGraph);

export default ModuleNetatmoRainGraphContainer
