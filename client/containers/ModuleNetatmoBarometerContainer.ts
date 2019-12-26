import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoBarometer from "../components/ModuleNetatmoBarometer"

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    reachable: netatmo.station_data?.reachable,
    pressure: netatmo.station_data?.data?.pressure,
    unit: application.user.pressure_unit
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoBarometerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoBarometer);

export default ModuleNetatmoBarometerContainer
