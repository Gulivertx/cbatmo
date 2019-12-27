import { connect } from 'react-redux'
import { ThunkDispatch} from "redux-thunk";
import { ApplicationState } from "../store";
import ModuleNetatmoRain from "../components/ModuleNetatmoRain"

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    module_data: netatmo.station_data?.modules.RAIN
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoRainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoRain);

export default ModuleNetatmoRainContainer
