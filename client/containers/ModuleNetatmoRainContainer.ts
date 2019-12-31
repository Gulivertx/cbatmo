import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoRain from "../components/ModuleNetatmoRain"
import * as netatmoActions from "../store/netatmo/actions";

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.RAIN,
    device_id: netatmo.station_data?.id,
    selected_timelapse: netatmo.selected_timelapse
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[], timelapse: '12h'|'1d'|'1m') => dispatch(netatmoActions.fetchMeasure(device, module, type, timelapse))
});

const ModuleNetatmoRainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoRain);

export default ModuleNetatmoRainContainer
