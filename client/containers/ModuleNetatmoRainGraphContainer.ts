import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import * as netatmoActions from '../store/netatmo/actions'
import ModuleNetatmoRainGraph from "../components/ModuleNetatmoRainGraph";
import {ApplicationState} from "../store";

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    device: netatmo.station_data?.id,
    module: netatmo.station_data?.modules.RAIN?.id,
    data: netatmo.measure_rain_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchRainMeasure: (device: string, module: string) => dispatch(netatmoActions.fetchRainMeasure(device, module))
});

const ModuleNetatmoRainGraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoRainGraph);

export default ModuleNetatmoRainGraphContainer
