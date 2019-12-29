import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoBarometer from "../components/ModuleNetatmoBarometer"
import * as netatmoActions from "../store/netatmo/actions";

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    reachable: netatmo.station_data?.reachable,
    pressure: netatmo.station_data?.data?.pressure,
    unit: application.user.pressure_unit,
    device_id: netatmo.station_data?.id
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchMeasure(device, module, type))
});

const ModuleNetatmoBarometerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoBarometer);

export default ModuleNetatmoBarometerContainer
