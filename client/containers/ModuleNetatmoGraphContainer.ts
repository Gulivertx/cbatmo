import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import ModuleNetatmoGraph from "../components/ModuleNetatmoGraph";
import {ApplicationState} from "../store";

const mapStateToProps = ({ netatmo}: ApplicationState) => ({
    data_main: netatmo.measure_main_data,
    data_indoor: netatmo.measure_indoor_data,
    data_outdoor: netatmo.measure_outdoor_data,
    data_rain: netatmo.measure_rain_data,
    data_wind: netatmo.measure_wind_data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({

});

const ModuleNetatmoRainGraphContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleNetatmoGraph);

export default ModuleNetatmoRainGraphContainer
