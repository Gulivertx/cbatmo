import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoStation from "../components/ModuleNetatmoStation"
import * as netatmoActions from "../store/netatmo/actions";

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    station_data: netatmo.station_data,
    device_id: netatmo.station_data?.id
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    fetchMeasure: (device: string, module: string, type: string[]) => dispatch(netatmoActions.fetchMeasure(device, module, type))
});

const ModuleNetatmoStationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoStation);

export default ModuleNetatmoStationContainer
