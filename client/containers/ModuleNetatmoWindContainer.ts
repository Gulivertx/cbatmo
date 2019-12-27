import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoWind from "../components/ModuleNetatmoWind"

const mapStateToProps = ({ netatmo, application}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.WIND,
    unit: application.user.windunit
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoWindContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoWind);

export default ModuleNetatmoWindContainer
