import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoIndoor from "../components/ModuleNetatmoIndoor"

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.INDOOR
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoIndoorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoIndoor);

export default ModuleNetatmoIndoorContainer
