import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoOurdoor from "../components/ModuleNetatmoOurdoor"

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.INDOOR
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoOutdoorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoOurdoor);

export default ModuleNetatmoOutdoorContainer
