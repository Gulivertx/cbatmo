import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoOutdoor from "../components/ModuleNetatmoOutdoor"

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.OUTDOOR
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoOutdoorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoOutdoor);

export default ModuleNetatmoOutdoorContainer
