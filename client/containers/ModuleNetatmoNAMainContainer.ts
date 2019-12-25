import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoNAMain from "../components/ModuleNetatmoNAMain"

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    station_data: netatmo.station_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoNAMainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoNAMain);

export default ModuleNetatmoNAMainContainer
