import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoStation from "../components/ModuleNetatmoStation"

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    station_data: netatmo.station_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoStationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoStation);

export default ModuleNetatmoStationContainer
